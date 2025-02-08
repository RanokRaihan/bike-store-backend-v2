import { Router } from "express";
import adminRouter from "../modules/admin/admin.routes";
import authRouter from "../modules/auth/auth.route";
import orderRouter from "../modules/order/order.routes";
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
  {
    path: "/orders",
    route: orderRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
