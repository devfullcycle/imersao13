import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletAssetDocument = HydratedDocument<WalletAsset>;

@Schema({
  collection: 'WalletAsset',
})
export class WalletAsset {}

export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset);
