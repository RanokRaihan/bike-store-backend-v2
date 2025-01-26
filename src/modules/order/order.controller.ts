import { NextFunction, Request, Response } from "express";
import { getSingleBikeFromDb } from "../product/product.service";
import {
  calculateTotalRevenue,
  createOrderToDb,
  getOrdersFromDb,
} from "./order.service";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getOrdersFromDb();
    res.status(200).json({
      message: "All orders fetched successfully",
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body;

    // check if the product exists
    const product = await getSingleBikeFromDb(order?.product);
    if (!product) {
      res.status(404).json({
        message: "Order placing failed. Product not found!",
        success: false,
        data: null,
      });
      return;
    }
    // calculate the total price
    order.totalPrice = order.quantity * product.price;

    // check if the product is in stock
    if (product.quantity < order.quantity) {
      if (product.quantity === 0) {
        throw new Error("Order placing failed. Product is out of stock!");
      }
      throw new Error(
        `order placing failed. ${order.quantity} bike is not in stock.  Only ${product.quantity} bike left in stock!`
      );
    }

    // create the order
    const newOrder = await createOrderToDb(order);
    if (!newOrder) {
      throw new Error("Order placing failed");
    }

    // update the product quantity
    product.quantity -= order.quantity;
    if (product.quantity === 0) {
      product.inStock = false;
    }
    const updatedProduct = await product.save();
    if (!updatedProduct) {
      throw new Error("Order placing failed");
    }

    res.status(201).json({
      message: "Order placed successfully!",
      success: true,
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

// calculate total revenue
export const getTotalRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalRevenue = await calculateTotalRevenue();
    res.status(200).json({
      message: "Total revenue fetched successfully!",
      success: true,
      data: totalRevenue,
    });
  } catch (error) {
    next(error);
  }
};
