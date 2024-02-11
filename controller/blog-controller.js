import Blog from "../model/Blog.js"; // Ensure correct path and file name
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "Couldn't find any user with this id" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession(); // Start a new session
        session.startTransaction(); // Start the transaction

        await blog.save({ session }); // Save the blog with the session
        existingUser.blogs.push(blog);
        await existingUser.save({ session });

        await session.commitTransaction(); // Commit the transaction
        session.endSession(); // End the session
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
    return res.status(201).json({ blog });
};

export const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        });
    } catch (error) {
        console.log(error);
    }
    if (!blog) {
        return res.status(500).json({ message: "Couldn't update blog" });
    }
    return res.status(200).json({ blog });
};

export const getById = async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({ message: "Could not delete blog" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
};
