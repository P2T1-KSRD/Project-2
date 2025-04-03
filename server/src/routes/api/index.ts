import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { restaurantRouter } from './restaurant-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use("/restaurant", restaurantRouter);

export default router;
