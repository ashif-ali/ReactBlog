import React, { useState } from "react";
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        margin: "24px auto",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        backgroundColor: "#fff",
    },
    title: {
        marginBottom: "24px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#333",
    },
    label: {
        marginBottom: "8px",
        marginTop: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#555",
    },
    input: {
        marginBottom: "16px",
    },
    button: {
        marginTop: "16px",
        borderRadius: "8px",
        backgroundColor: "#64B5F6",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#42a5f5",
        },
    },
});

const AddBlog = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });

    const sendRequest = async () => {
        const response = await axios
            .post("https://react-blog-api-three.vercel.app/api/blog/add", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: localStorage.getItem("userId"),
            })
            .catch((error) => console.error({ error }));
        const data = await response?.data;
        return data;
    };

    const handleChange = (event) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest().then(() => navigate("/blogs"));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box className={classes.container}>
                    <Typography variant="h4" className={classes.title}>
                        Add Your New Blog
                    </Typography>
                    <InputLabel className={classes.label}>Title</InputLabel>
                    <TextField
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                    />
                    <InputLabel className={classes.label}>
                        Description
                    </InputLabel>
                    <TextField
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        className={classes.input}
                    />
                    <InputLabel className={classes.label}>Image URL</InputLabel>
                    <TextField
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        Add Blog
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddBlog;
