import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  jwt_access_secret,
  jwt_expires_in,
  jwt_refresh_expires_in,
  jwt_refresh_secret,
  node_env,
} from "../../config";
import ApiError from "../../errors/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { createToken } from "../../utils/createToken";
import { sendResponse } from "../../utils/sendResponse";
import { findUserWithEmailService } from "../user/user.service";
import { SignOptions } from "./../../../node_modules/@types/jsonwebtoken/index.d";
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
      jwt_access_secret as string,
      jwt_expires_in as SignOptions["expiresIn"]
    );
    const refreshToken = createToken(
      jwtPayload,
      jwt_refresh_secret as string,
      jwt_refresh_expires_in as SignOptions["expiresIn"]
    );
    res.cookie("refreshToken", refreshToken, {
      secure: node_env === "production",
      httpOnly: true,
      sameSite: node_env === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      path: "/",
    });

    // send the token as response
    sendResponse(res, 200, "Login successful", { accessToken });
  }
);
