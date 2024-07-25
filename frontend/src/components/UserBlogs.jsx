import React, { useEffect, useState } from "react";
import axios from "axios";

import Blog from "./Blog";

const UserBlogs = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await axios
                .get(`https://reactblog-pr8l.onrender.com/api/blog/user/${userId}`)
                .catch((error) => {
                    console.error({ error });
                });
            const data = await response?.data;
            return data;
        };

        sendRequest().then((response) => {
            setUser(response.user);
        });
    }, [userId]);

    return (
        <div>
            {user &&
                user.blogs &&
                user.blogs.map((blog, index) => (
                    <Blog
                        id={blog._id}
                        isUser={true}
                        key={index}
                        title={blog.title}
                        description={blog.description}
                        imageUrl={blog.image}
                        userName={user.name ?? "Undefined"}
                    />
                ))}
        </div>
    );
};

export default UserBlogs;
