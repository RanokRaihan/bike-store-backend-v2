import jwt, { SignOptions } from "jsonwebtoken";
import { IjwtPayload } from "../modules/auth/auth.interface";

export const createToken = (
  jwtPayload: IjwtPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"]
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
