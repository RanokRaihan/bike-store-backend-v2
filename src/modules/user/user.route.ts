import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import validateRequest from "../../middleware/validateRequest";
import {
  createUserController,
  getAllUserController,
  toggleUserStatusController,
} from "./user.controller";
import { createUserSchema } from "./user.validation";

const userRouter = Router();

// user routes
userRouter.get("/", auth, authorize(["admin"]), getAllUserController);
userRouter.post(
  "/register",
  validateRequest(createUserSchema),
  createUserController
);

userRouter.patch(
  "/toggle-status/:id",
  auth,
  authorize(["admin"]),
  toggleUserStatusController
);

export default userRouter;
