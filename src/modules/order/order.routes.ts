import { Router } from "express";
import { getAllOrders, getTotalRevenue, placeOrder } from "./order.controller";

const router = Router();

//get all orders
router.get("/", getAllOrders);

// place a new order
router.post("/", placeOrder);
//calculate total revenue
router.get("/revenue", getTotalRevenue);
export default router;
