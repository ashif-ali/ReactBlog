import express from "express";
import {
    addBlog,
    getAllBlogs,
    getById,
    updateBlog,
    deleteBlog,
} from "../controller/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
