import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Auth = ({ isSignUp, setIsSignUp }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async (type = "login") => {
        const res = await axios
            .post(`https://reactblog-pr8l.onrender.com/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            sendRequest("signup")
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/blogs"));
        } else {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/blogs"));
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: 400,
                        padding: 3,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: "white",
                    }}
                >
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        {isSignUp ? "Signup" : "Login"}
                    </Typography>
                    {isSignUp && (
                        <TextField
                            onChange={handleChange}
                            name="name"
                            value={inputs.name}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                    <TextField
                        onChange={handleChange}
                        name="email"
                        value={inputs.email}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="password"
                        value={inputs.password}
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: 2 }}
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => setIsSignUp(!isSignUp)}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    >
                        {isSignUp ? "Login" : "Signup Instead"}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Auth;
