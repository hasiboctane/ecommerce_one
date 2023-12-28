import asyncHandler from "../helpers/asyncHandler.js";
import generateToken from "../helpers/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const UserController = {

    getAll: asyncHandler(async (req, res) => {
        const users = await User.find({}).select("-password");
        if (!users) {
            res.status(404).send({
                message: "No users found"
            });
        }
        res.status(200).send(users)

    }),
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

    getCurrentUserProfile: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.status(200).send({
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        })
    }),
    updateCurrentUserProfile: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        res.status(200).send({
            message: "User updated successfully",
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            }
        })
    }),
    deleteUserById: asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
            // throw new Error("User not found");
        }
        if (user.isAdmin) {
            return res.status(401).send({ message: "Cannot delete an admin" });
        }
        await User.deleteOne({ _id: user._id });
        res.status(200).send({ message: "User deleted successfully" });

    }),
    getUserById: asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({
            data: user
        })
    }),
    updateUserById: asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (user.isAdmin) {
            return res.status(401).send({ message: "Cannot update an admin" });
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;
        const updatedUser = await user.save();
        res.status(200).send({
            message: "Updated User Successfully",
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            }
        })
    })

}


export default UserController