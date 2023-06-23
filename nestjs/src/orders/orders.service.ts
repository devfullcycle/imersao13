import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { InitTransactionDto, InputExecuteTransactionDto } from './order.dto';
import { Order, OrderStatus, OrderType } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Order as OrderSchema } from './order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    @Inject('ORDERS_PUBLISHER')
    private readonly kafkaClient: ClientKafka,
    @InjectModel(OrderSchema.name) private orderModel: Model<OrderSchema>,
  ) {}

  all(filter: { wallet_id: string }) {
    return this.prismaService.order.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Transactions: true,
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  async initTransaction(input: InitTransactionDto) {
    //prismaService.$use()

    const order = await this.prismaService.order.create({
      data: {
        asset_id: input.asset_id,
        wallet_id: input.wallet_id,
        shares: input.shares,
        partial: input.shares,
        price: input.price,
        type: input.type,
        status: OrderStatus.PENDING,
        version: 1,
      },
    });
    this.kafkaClient.emit('input', {
      order_id: order.id,
      investor_id: order.wallet_id,
      asset_id: order.asset_id,
      //current_shares: order.shares,
      shares: order.shares,
      price: order.price,
      order_type: order.type,
    });
    return order;
  }

  async executeTransaction(input: InputExecuteTransactionDto) {
    //transacao e travamento
    return this.prismaService.$transaction(async (prisma) => {
      const order = await prisma.order.findUniqueOrThrow({
        where: { id: input.order_id },
      });

      await prisma.order.update({
        where: { id: input.order_id, version: order.version },
        data: {
          partial: order.partial - input.negotiated_shares,
          status: input.status,
          Transactions: {
            create: {
              broker_transaction_id: input.broker_transaction_id,
              related_investor_id: input.related_investor_id,
              shares: input.negotiated_shares,
              price: input.price,
            },
          },
          version: { increment: 1 },
        },
      });
      if (input.status === OrderStatus.CLOSED) {
        await prisma.asset.update({
          where: { id: order.asset_id },
          data: {
            price: input.price,
          },
        });
        await this.prismaService.assetDaily.create({
          data: {
            asset_id: order.asset_id,
            date: new Date(),
            price: input.price,
          },
        });
        const walletAsset = await prisma.walletAsset.findUnique({
          where: {
            wallet_id_asset_id: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
            },
          },
        });
        if (walletAsset) {
          console.log(walletAsset);
          //se já tiver o ativo na carteira, atualiza a quantidade de ativos
          await prisma.walletAsset.update({
            where: {
              wallet_id_asset_id: {
                asset_id: order.asset_id,
                wallet_id: order.wallet_id,
              },
              version: walletAsset.version,
            },
            data: {
              shares:
                order.type === OrderType.BUY
                  ? walletAsset.shares + order.shares
                  : walletAsset.shares - order.shares,
              version: { increment: 1 },
            },
          });
        } else {
          //só poderia adicionar na carteira se a ordem for de compra
          await prisma.walletAsset.create({
            data: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
              shares: input.negotiated_shares,
              version: 1,
            },
          });
        }
      }
    });
    //-------------adicionar a transacao em order
    //-----contabilizar a quantidade de ativos na carteira
    //----atualizar o status da ordem OPEN ou CLOSED
    //----atualizar o preco do ativo
  }

  subscribeEvents(
    wallet_id: string,
  ): Observable<{ event: 'order-created' | 'order-updated'; data: Order }> {
    return new Observable((observer) => {
      this.orderModel
        .watch(
          [
            {
              $match: {
                $or: [{ operationType: 'insert' }, { operationType: 'update' }],
                'fullDocument.wallet_id': wallet_id,
              },
            },
          ],
          { fullDocument: 'updateLookup' },
        )
        .on('change', async (data) => {
          const order = await this.prismaService.order.findUnique({
            where: {
              id: data.fullDocument._id + '',
            },
          });
          observer.next({
            event:
              data.operationType === 'insert'
                ? 'order-created'
                : 'order-updated',
            data: order,
          });
        });
    });
  }
}
