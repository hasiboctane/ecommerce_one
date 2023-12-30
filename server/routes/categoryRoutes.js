import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
const categoryRouter = express.Router();
categoryRouter.route('/')
    .post(authenticateUser, authorizeAdmin, CategoryController.create)
    .get(CategoryController.getAll);

categoryRouter.route('/:id')
    .get(CategoryController.getById)
    .put(authenticateUser, authorizeAdmin, CategoryController.update)
    .delete(authenticateUser, authorizeAdmin, CategoryController.delete)



export default categoryRouter;