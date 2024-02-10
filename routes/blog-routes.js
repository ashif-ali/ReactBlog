import express from "express";
import { addBlog, getAllBlogs } from "../controller/blog-controller.js"; // Corrected path

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);

export default blogRouter;
