import express, { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";

const router:Router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  // {
  //   path: "/user",
  //   route: UserRoutes,
  // },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;