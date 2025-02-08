import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { getInsightController } from "../product/product.controller";

const adminRouter = Router();
adminRouter.get(
  "/get-insight",
  auth,
  authorize(["admin"]),
  getInsightController
);
export default adminRouter;
