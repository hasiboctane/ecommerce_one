import express from "express";
import UserController from "../controllers/userController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.route("/").post(UserController.createUser).get(authenticateUser, authorizeAdmin, UserController.getAll);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/logout', UserController.logoutCurrentUser);
export default userRouter