import express from "express";

import {
    getAllBlogs,
    addBlog,
    updateBlog,
    getBlogById,
    deleteBlogById,
    getBlogsByUserId,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlogById);
blogRouter.get("/user/:id", getBlogsByUserId);

export default blogRouter;
