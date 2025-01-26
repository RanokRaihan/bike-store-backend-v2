import { ObjectId } from "mongoose";

export interface IOrder {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
}
