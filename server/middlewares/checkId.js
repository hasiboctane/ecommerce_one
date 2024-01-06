import { isValidObjectId } from "mongoose";
import asyncHandler from "../helpers/asyncHandler.js";

const checkId = asyncHandler(async (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400)
        throw new Error(`Invalid Object of ${req.params.id}`)
    }
    next();
})
export default checkId