//Data Transfer Object

import { OrderType } from '@prisma/client';

export class InitTransactionDto {
  asset_id: string;
  wallet_id: string;
  shares: number;
  price: number;
  type: OrderType;
}
//class-transformer class-validator

export class InputExecuteTransactionDto {
  order_id: string;
  status: 'OPEN' | 'CLOSED';
  related_investor_id: string;
  broker_transaction_id: string;
  negotiated_shares: number;
  price: number;
}
