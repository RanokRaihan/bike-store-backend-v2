import { model, Schema } from "mongoose";
import { IAddress, IOrder } from "./order.interface";

const addressSchema = new Schema<IAddress>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required!"],
    },
    address1: {
      type: String,
      required: [true, "Address 1 is required!"],
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "City is required!"],
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required!"],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required!"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required!"],
          min: [1, "Quantity must be at least 1!"],
        },
        salePrice: {
          type: Number,
          required: [true, "Sale price is required!"],
          min: [0, "Sale price must be a positive number!"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required!"],
      min: [0, "Total price must be a positive number!"],
    },
    shippingCharge: {
      type: Number,
      min: [0, "Shipping charge must be a positive number!"],
      default: 0,
    },
    shippingAddress: {
      type: addressSchema,
      required: [true, "Shipping address is required!"],
    },

    // refactor after payment gateway integration

    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "paid",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = model("Order", orderSchema);
