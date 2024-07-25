import mongoose from "mongoose";

import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res) => {
    console.log("req.ip: - getAllBlogs", req.ip);
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ message: "Error retrieving blogs" });
    }
    if (!blogs.length) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res) => {
    console.log("req.ip: - addBlog", req.ip);
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return res.status(500).json({ message: "Error finding user" });
    }

    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "Unable To Find User By This ID" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (error) {
        return res.status(500).json({ message: "Error saving blog" });
    }
    return res.status(200).json({ blog });
};

export const updateBlog = async (req, res) => {
    console.log("req.ip: - updateBlog", req.ip);
    const { title, description, image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, description, image },
            { new: true }
        );
    } catch (error) {
        return res.status(500).json({ message: "Error updating blog" });
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ blog });
};

export const getBlogById = async (req, res) => {
    console.log("req.ip - getBlogById:", req.ip);
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving blog" });
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog });
};

export const deleteBlogById = async (req, res) => {
    console.log("req.ip - deleteBlogById:", req.ip);
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(blogId).populate("user");
        if (blog && blog.user) {
            await blog.user.blogs.pull(blog);
            await blog.user.save();
        }
    } catch (error) {
        return res.status(500).json({ message: "Error deleting blog" });
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable To Delete" });
    }
    return res
        .status(200)
        .json({ message: `Blog: ${blog.title} Successfully Deleted` });
};

export const getBlogsByUserId = async (req, res) => {
    console.log("req.ip - getBlogsByUserId:", req.ip);
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving user blogs" });
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blogs Found of This User" });
    }
    return res.status(200).json({ user: userBlogs });
};
