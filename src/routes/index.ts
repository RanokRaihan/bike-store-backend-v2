import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import productRouter from "../modules/product/product.routes";
import userRouter from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/products",
    route: productRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
