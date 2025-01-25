import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { jwt_expires_in, jwt_secret } from "../../config";
import ApiError from "../../errors/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { createToken } from "../../utils/createToken";
import { sendResponse } from "../../utils/sendResponse";
import { findUserWithEmailService } from "../user/user.service";
import { IjwtPayload, TUserRole } from "./auth.interface";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // check the email and password
    const user = await findUserWithEmailService(email);
    // if not valid, throw error
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new ApiError(401, "Invalid credentials");
    }
    // else, create a token and send the token as response
    const jwtPayload: IjwtPayload = {
      _id: user._id,
      email: user.email,
      role: user.role as TUserRole,
    };
    const accessToken = createToken(
      jwtPayload,
      jwt_secret as string,
      jwt_expires_in as string
    );

    // send the token as response
    sendResponse(res, 200, "Login successful", { token: accessToken });
  }
);
