export type TUserRole = "customer" | "admin";
export interface IjwtPayload {
  _id: string;
  email: string;
  role?: TUserRole;
}
