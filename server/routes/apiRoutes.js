import express from "express";
import userRouter from "./userRoutes.js";
import categoryRouter from "./categoryRoutes.js";
const router = express.Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
export default router