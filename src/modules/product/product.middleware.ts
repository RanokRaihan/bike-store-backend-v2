import { NextFunction, Request, Response } from "express";

export const modifyAsNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { price, discount, quantity } = req.body;
  req.body.price = Number.isNaN(Number(price)) ? price : Number(price);
  req.body.quantity = Number.isNaN(Number(quantity))
    ? quantity
    : Number(quantity);
  if (discount) {
    req.body.discount = Number.isNaN(Number(discount))
      ? discount
      : Number(discount);
  }
  next();
};
