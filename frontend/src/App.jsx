import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import UserBlogs from "./components/UserBlogs";
import { authActions } from "./redux/store";

const NotFound = () => (
    <h1 style={{ textAlign: "center", marginTop: "80px", color: "#ff6347" }}>
        Page Not Found
    </h1>
);

const Home = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    return (
        <div>
            {!isLoggedIn && (
                <h1
                    style={{
                        textAlign: "center",
                        marginTop: "80px",
                        color: "#4682b4",
                    }}
                >
                    LogIn or SignUp to see the blogs...
                </h1>
            )}
        </div>
    );
};

function App() {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            dispatch(authActions.login());
        }
    }, [dispatch]);

    return (
        <>
            <header>
                <Header isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {!isLoggedIn ? (
                        <Route
                            path="/auth"
                            element={
                                <Auth
                                    isSignUp={isSignUp}
                                    setIsSignUp={setIsSignUp}
                                />
                            }
                        />
                    ) : (
                        <>
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/myBlogs" element={<UserBlogs />} />
                            <Route
                                path="/myBlogs/:id"
                                element={<BlogDetails />}
                            />
                            <Route path="/blogs/add" element={<AddBlog />} />
                        </>
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
