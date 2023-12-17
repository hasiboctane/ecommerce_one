import jwt from "jsonwebtoken";
import asyncHandler from "../helpers/asyncHandler.js";
import User from "../models/userModel.js";

const authenticateUser = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.userId).select("-password");
    next();

})

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: "Not authorized as an admin" });
        // throw new Error("Not authorized as an admin");

    }
}

export { authenticateUser, authorizeAdmin };