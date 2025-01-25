import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { createUserController } from "../user/user.controller";
import { createUserSchema } from "../user/user.validation";
import { loginUserController } from "./auth.controller";

const authRouter = Router();

//create a new user
authRouter.post(
  "/register",
  validateRequest(createUserSchema),
  createUserController
);

// login user
authRouter.post("/login", loginUserController);

export default authRouter;
