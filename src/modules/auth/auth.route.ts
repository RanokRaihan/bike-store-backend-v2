import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  changePasswordController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
} from "./auth.controller";
import { changePasswordSchema } from "./auth.validation";

const authRouter = Router();

// login user
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.post("/refresh-token", refreshTokenController);
authRouter.put(
  "/change-password",
  validateRequest(changePasswordSchema),
  changePasswordController
);

export default authRouter;
