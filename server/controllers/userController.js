import asyncHandler from "../helpers/asyncHandler.js";
import generateToken from "../helpers/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const UserController = {

    getAll: async (req, res) => {
        res.send("hello world Controller");
    },
    createUser: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new Error("All fields are required");
        }
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).send({ message: "User already exists" })
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = User({ username, email, password: hashedPassword });
        try {
            await newUser.save();
            generateToken(res, newUser._id);
            res.status(201).send({
                message: "User created successfully",
                data: {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin
                }
            });
        } catch (error) {
            res.status(400);
            throw new Error("Error while creating user");
        }
    }),
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).send({ message: "Credentials do not match" });
        }
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }
        generateToken(res, userExists._id);
        return res.status(200).send({
            message: "User logged in successfully",
            data: {
                _id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                isAdmin: userExists.isAdmin
            }
        });
    }),
    logoutCurrentUser: asyncHandler(async (req, res) => {
        res.status(200).clearCookie("token").send({
            message: "User logged out successfully"
        });
    }),

}


export default UserController