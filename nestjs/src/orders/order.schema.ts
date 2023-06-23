import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  collection: 'Order',
})
export class Order {}

export const OrderSchema = SchemaFactory.createForClass(Order);
