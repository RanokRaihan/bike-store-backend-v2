import { ObjectId } from "mongoose";

export interface IAddress {
  fullName: string;
  address1: string;
  address2: string;
  postalCode: string;
  phone: string;
  city: string;
  country: string;
}
export interface IOrderProductItem {
  product: ObjectId;
  quantity: number;
  salePrice: number;
}

export interface IOrder {
  user: ObjectId;
  products: IOrderProductItem[];
  totalPrice: number;
  shippingCharge: number;
  shippingAddress: IAddress;

  transaction?: {
    id?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };

  status:
    | "Pending"
    | "Paid"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
}
