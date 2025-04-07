import { Router } from "express";
import { userRouter } from "./user-routes.js";
import { restaurantRouter } from "./restaurant-routes.js";
import { voteRouter } from "./vote-routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/restaurants", restaurantRouter);
router.use("/votes", voteRouter);

export default router;
