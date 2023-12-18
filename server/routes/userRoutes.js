import express from "express";
import UserController from "../controllers/userController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.route("/")
    .post(UserController.createUser)
    .get(authenticateUser, authorizeAdmin, UserController.getAll);

userRouter.post('/login', UserController.loginUser);
userRouter.post('/logout', UserController.logoutCurrentUser);

userRouter.route('/profile')
    .get(authenticateUser, UserController.getCurrentUserProfile)
    .put(authenticateUser, UserController.updateCurrentUserProfile);

// Admin Routes 
userRouter.route('/:id')
    .delete(authenticateUser, authorizeAdmin, UserController.deleteUserById)
    .get(authenticateUser, authorizeAdmin, UserController.getUserById)
    .put(authenticateUser, authorizeAdmin, UserController.updateUserById)
export default userRouter