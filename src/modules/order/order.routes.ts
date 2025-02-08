import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import validateRequest from "../../middleware/validateRequest";
import {
  getAllCustomerOrderController,
  getAllOrderController,
  placeOrderController,
  updateOrderStatusController,
  verifyPaymentController,
} from "./order.controller";
import {
  orderValidationSchema,
  updateOrderStatusSchema,
} from "./order.validation";

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
router.get(
  "/verify-payment",
  auth,
  authorize(["customer"]),
  verifyPaymentController
);
router.patch(
  "/update-order-status/:order_id",
  auth,
  authorize(["admin"]),
  validateRequest(updateOrderStatusSchema),
  updateOrderStatusController
);

export default router;
