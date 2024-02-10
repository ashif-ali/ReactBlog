import Blog from "../model/Blog.js"; // Ensure correct path and file name

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
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        await blog.save();
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json({ blog });
};
