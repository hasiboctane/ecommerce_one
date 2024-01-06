import { Router } from "express";
import formidable from "express-formidable";
import ProductController from "../controllers/productController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const productRouter = Router();
productRouter.route('/')
    .get(ProductController.fetchProducts)
    .post(authenticateUser, authorizeAdmin, formidable(), ProductController.addProduct)

productRouter.route('/all')
    .get(ProductController.getAllProducts)
productRouter.route('/:id')
    .get(ProductController.getProductById)
    .put(authenticateUser, authorizeAdmin, formidable(), ProductController.updateProduct)
    .delete(authenticateUser, authorizeAdmin, ProductController.deleteProduct)


export default productRouter






