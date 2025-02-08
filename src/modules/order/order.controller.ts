import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import AppError from "../../errors/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import Product from "../product/product.model";
import { IOrder } from "./order.interface";
import {
  createOrderToDb,
  getCustomerOrdersFromDb,
  getOrdersFromDb,
  updateOrderInDb,
} from "./order.service";
import { orderUtils } from "./order.utils";

export const placeOrderController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = req.body?.products;
    const user = req.user;
    const client_ip = req.ip;

    console.log({ products, user, client_ip });

    if (!products?.length) {
      throw new AppError(400, "Order is not specified");
    }
    let totalPrice = req.body?.shippingCharge || 0;
    const productDetails = await Promise.all(
      products.map(async (item: { product: string; quantity: number }) => {
        const product = await Product.findById(item.product);
        if (product) {
          //todo: check if product is available in stock
          if (product.quantity === 0) {
            throw new AppError(
              400,
              `Order placing failed. ${product.brand} ${product.model} is out of stock!`
            );
          }
          if (product.quantity < item.quantity) {
            throw new AppError(
              400,
              `order placing failed. ${product.quantity} ${product.brand} ${product.model} is not in stock.  Only ${product.quantity}  left in stock!`
            );
          }
          const subtotal = product ? (product.price || 0) * item.quantity : 0;
          totalPrice += subtotal;
          return { ...item, salePrice: product.price };
        } else {
          throw new AppError(404, "Product not found");
        }
      })
    );

    console.log({ productDetails });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update stock
      await Promise.all(
        productDetails.map(async (item) => {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { quantity: -item.quantity } },
            { session }
          );
        })
      );

      // Create order
      const orderPayload = {
        user: user._id,
        products: productDetails,
        totalPrice,
        shippingCharge: req.body?.shippingCharge || 0,
        shippingAddress: req.body?.address,
      } as IOrder;
      let order = await createOrderToDb(orderPayload);

      // payment integration
      const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: req.body?.address?.fullName || user.name,
        customer_address: req.body?.address.address1,
        customer_email: user.email,
        customer_phone: req.body?.address.address1,
        customer_city: req.body?.address.address1,
        client_ip,
      };
      const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
      let updatedOrder;
      if (payment?.transactionStatus) {
        updatedOrder = await updateOrderInDb(
          { _id: order._id.toString() },
          {
            transaction: {
              id: payment.sp_order_id,
              transactionStatus: payment.transactionStatus,
            },
          }
        );
      } else {
        throw new AppError(500, "payment initiate failed");
      }
      await session.commitTransaction();
      session.endSession();

      sendResponse(res, 201, "order placed successfully", {
        updatedOrder,
        checkout_url: payment.checkout_url,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
);

// veryfy payment
export const verifyPaymentController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order_id = req.query?.order_id;
    console.log({ params: req.params });

    const verifiedPayment = await orderUtils.verifyPaymentAsync(
      order_id as string
    );

    let finalOrder;
    if (verifiedPayment.length) {
      finalOrder = await updateOrderInDb(
        {
          "transaction.id": order_id,
        },
        {
          "transaction.bank_status": verifiedPayment[0].bank_status,
          "transaction.sp_code": verifiedPayment[0].sp_code,
          "transaction.sp_message": verifiedPayment[0].sp_message,
          "transaction.transactionStatus":
            verifiedPayment[0].transaction_status,
          "transaction.method": verifiedPayment[0].method,
          "transaction.date_time": verifiedPayment[0].date_time,
          status:
            verifiedPayment[0].bank_status == "Success"
              ? "Paid"
              : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
              ? "Cancelled"
              : undefined,
        }
      );

      if (finalOrder?._id) {
        sendResponse(res, 200, "Payment verified successfully", finalOrder);
      } else {
        throw new AppError(500, "Payment verification failed ");
      }
    } else {
      throw new AppError(500, "Payment verification failed ");
    }
  }
);

export const getAllOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getOrdersFromDb(req.query);
    sendResponse(res, 200, "Orders fetched successfully", orders);
  } catch (error) {
    next(error);
  }
};

export const getAllCustomerOrderController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const orders = await getCustomerOrdersFromDb(req.query, user._id);
    sendResponse(res, 200, "Orders fetched successfully", orders);
  }
);

export const updateOrderStatusController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order_id = req.params?.order_id;
    const status = req.body?.status;
    const updatedOrder = await updateOrderInDb(
      { _id: order_id as string },
      { status }
    );
    sendResponse(res, 200, "Order status updated successfully", updatedOrder);
  }
);
