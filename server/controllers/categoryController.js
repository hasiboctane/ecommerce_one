import asyncHandler from "../helpers/asyncHandler.js";
import Category from "../models/categoryModel.js";

const CategoryController = {
    create: asyncHandler(async (req, res) => {
        const { name } = req.body;
        if (!name) {
            throw new Error("Name is required");
        }
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).send({ message: "Category already exists" });
        }
        const category = await new Category({ name }).save();
        res.status(201).send(category)
    }),
    getById: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            })
        }
        res.status(200).send(category)
    }),
    getAll: asyncHandler(async (req, res) => {
        const categories = await Category.find({});
        if (!categories) {
            res.status(404).send({
                message: "No categories found"
            });
        }
        res.status(200).send(categories)
    }),
    update: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            })
        }
        const { name } = req.body;
        const categoryExists = await Category.findOne({ name })
        if (categoryExists) {
            return res.status(400).send({ message: "Category already exists" })
        }
        category.name = name || category.name;
        const updatedCategory = await category.save();
        res.status(200).send(updatedCategory)
    }),
    delete: asyncHandler(async (req, res) => {
        // try {
        //     const removed = await Category.findByIdAndRemove(req.params.id);
        //     res.json(removed);
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: "Internal server error" });
        // }
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            })
        }
        await category.deleteOne({ _id: category._id });
        res.status(200).send({ message: "Category deleted successfully" })
    })
}



export default CategoryController;