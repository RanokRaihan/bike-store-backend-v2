import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import validateRequest from "../../middleware/validateRequest";
import {
  getAllCustomerOrderController,
  getAllOrderController,
  placeOrderController,
  verifyPaymentController,
} from "./order.controller";
import { orderValidationSchema } from "./order.validation";

const router = Router();

//get all orders
router.get("/", auth, authorize(["admin"]), getAllOrderController);
router.get(
  "/my-orders",
  auth,
  authorize(["customer"]),
  getAllCustomerOrderController
);

// place a new order
router.post(
  "/place-order",
  auth,
  authorize(["customer"]),
  validateRequest(orderValidationSchema),
  placeOrderController
);
router.patch(
  "/verify-payment",
  auth,
  authorize(["customer"]),
  verifyPaymentController
);

export default router;
