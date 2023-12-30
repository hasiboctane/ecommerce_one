import { Schema, model } from "mongoose";
const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true
    }
}, { timestamps: true });


const Category = model("Category", categorySchema);
export default Category;