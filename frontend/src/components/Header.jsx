import React, { useState } from "react";
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Box,
    Tab,
    Tabs,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";

const Header = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#1A237E" }}>
            <Toolbar>
                <Typography
                    variant="h4"
                    sx={{ flexGrow: 1, color: "#FFFFFF" }}
                    component={Link}
                    to="/"
                >
                    BlogsApp
                </Typography>
                {isLoggedIn && (
                    <Box display="flex" sx={{ flexGrow: 1 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            indicatorColor="secondary"
                        >
                            <Tab
                                LinkComponent={Link}
                                to="/blogs"
                                label="All Blogs"
                            />
                            <Tab
                                LinkComponent={Link}
                                to="/myBlogs"
                                label="My Blogs"
                            />
                            <Tab
                                LinkComponent={Link}
                                to="/blogs/add"
                                label="Add Blog"
                            />
                        </Tabs>
                    </Box>
                )}
                <Box sx={{ display: "flex", gap: "10px" }}>
                    {!isLoggedIn ? (
                        <>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                sx={{
                                    backgroundColor: "#64B5F6",
                                    color: "#FFFFFF",
                                }}
                            >
                                LogIn
                            </Button>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                sx={{
                                    backgroundColor: "#64B5F6",
                                    color: "#FFFFFF",
                                }}
                            >
                                SignUp
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => dispatch(authActions.logout())}
                            LinkComponent={Link}
                            to="/auth"
                            sx={{
                                backgroundColor: "#64B5F6",
                                color: "#FFFFFF",
                            }}
                        >
                            LogOut
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
