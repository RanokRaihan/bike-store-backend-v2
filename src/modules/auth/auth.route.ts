import { Router } from "express";
import { loginUserController } from "./auth.controller";

const authRouter = Router();

// login user
authRouter.post("/login", loginUserController);

export default authRouter;
