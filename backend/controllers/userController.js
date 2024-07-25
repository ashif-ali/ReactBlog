import bcrypt from "bcryptjs";

import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    console.log("req.ip - userController:", req.ip);
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving users" });
    }
    if (!users.length) {
        return res.status(404).json({ message: "No Users found" });
    }
    return res.status(200).json({ users });
};

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error checking for existing user" });
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User Already Exists! Login Instead" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ name, email, password: hashedPassword, blogs: [] });
    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ message: "Error saving user" });
    }
    return res.status(200).json({ user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error checking for existing user" });
    }
    if (!existingUser) {
        return res
            .status(400)
            .json({
                message:
                    "Couldn't Find User By This Email! Change Email Or SignUp Instead",
            });
    }

    const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
    );
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }
    return res
        .status(200)
        .json({ message: "Login Successful", user: existingUser });
};
