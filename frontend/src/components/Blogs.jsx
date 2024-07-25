import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const sendRequest = async () => {
        const response = await axios
            .get("https://react-blog-api-three.vercel.app//api/blog")
            .catch((error) => console.log({ error }));
        const data = await response?.data;
        return data;
    };

    useEffect(() => {
        sendRequest().then((response) => setBlogs(response.blogs));
    }, []);

    return (
        <div>
            {blogs &&
                blogs.map((blog, index) => (
                    <Blog
                        id={blog._id}
                        isUser={
                            localStorage.getItem("userId") === blog.user._id
                        }
                        key={index}
                        title={blog.title}
                        description={blog.description}
                        imageUrl={blog.image}
                        userName={blog.user.name ?? "Undefined"}
                    />
                ))}
        </div>
    );
};

export default Blogs;
