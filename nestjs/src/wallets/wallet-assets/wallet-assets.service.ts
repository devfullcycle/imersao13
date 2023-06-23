import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Model } from 'mongoose';
import { WalletAsset as WalletAssetSchema } from './wallet-asset.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { WalletAsset } from '@prisma/client';
@Injectable()
export class WalletAssetsService {
  constructor(
    private prismaService: PrismaService,
    @InjectModel(WalletAssetSchema.name)
    private walletAssetModel: Model<WalletAssetSchema>,
  ) {}

  all(filter: { wallet_id: string }) {
    return this.prismaService.walletAsset.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Asset: {
          select: {
            id: true,
            symbol: true,
            price: true,
          },
        },
      },
    });
  }

  create(input: { wallet_id: string; asset_id: string; shares: number }) {
    return this.prismaService.walletAsset.create({
      data: {
        wallet_id: input.wallet_id,
        asset_id: input.asset_id,
        shares: input.shares,
        version: 1,
      },
    });
  }

  subscribeEvents(wallet_id: string): Observable<{
    event: 'wallet-asset-updated';
    data: WalletAsset;
  }> {
    return new Observable((observer) => {
      this.walletAssetModel
        .watch(
          [
            {
              $match: {
                operationType: 'update',
                'fullDocument.wallet_id': wallet_id,
              },
            },
          ],
          { fullDocument: 'updateLookup' },
        )
        .on('change', async (data) => {
          console.log(data);
          const walletAsset = await this.prismaService.walletAsset.findUnique({
            where: {
              id: data.fullDocument._id + '',
            },
          });
          observer.next({
            event: 'wallet-asset-updated',
            data: walletAsset,
          });
        });
    });

    // return this.prismaService.$subscribe.walletAsset({
    //   where: {
    //     mutation_in: ['CREATED', 'UPDATED', 'DELETED'],
    //     node: {
    //       wallet_id,
    //     },
    //   },
    // });
  }
}
