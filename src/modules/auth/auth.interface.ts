export type TUserRole = "customer" | "admin";
export interface IjwtPayload {
  name: string;
  _id: string;
  email: string;
  role?: TUserRole;
}
