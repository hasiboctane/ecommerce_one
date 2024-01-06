import asyncHandler from '../helpers/asyncHandler.js';
import Product from '../models/productModel.js';
const ProductController = {
    addProduct: asyncHandler(async (req, res) => {
        const { name, description, price, category, quantity, brand } = req.fields
        switch (true) {
            case !name:
                return res.send({ error: "Name is required" })
            case !description:
                return res.send({ error: "Description is required" })
            case !price:
                return res.send({ error: "Price is required" })
            case !category:
                return res.send({ error: "Category is required" })
            case !quantity:
                return res.send({ error: "Quantity is required" })
            case !brand:
                return res.send({ error: "Brand is required" })
        }
        const product = new Product({ ...req.fields });
        await product.save();
        res.status(201).send(product)
    }),
    fetchProducts: asyncHandler(async (req, res) => {
        const pageSize = 5;
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: "i" } }
            : {};
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(pageSize);
        res.status(200).send({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: true,
        });
    }),
    getProductById: asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({ message: "Product not found" })
        }
        res.status(200).send(product)
    }),
    getAllProducts: asyncHandler(async (req, res) => {
        const products = await Product.find({}).populate("category").limit(12).sort({ createdAt: -1 })
        res.status(200).send(products)
    }),
    updateProduct: asyncHandler(async (req, res) => {
        const { name, description, price, category, quantity, brand } = req.fields
        switch (true) {
            case !name:
                return res.send({ error: "Name is required" })
            case !description:
                return res.send({ error: "Description is required" })
            case !price:
                return res.send({ error: "Price is required" })
            case !category:
                return res.send({ error: "Category is required" })
            case !quantity:
                return res.send({ error: "Quantity is required" })
            case !brand:
                return res.send({ error: "Brand is required" })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });
        res.status(200).send(product)
    }),
    deleteProduct: asyncHandler(async (req, res) => {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Product deleted successfully" })
    })
}

export default ProductController