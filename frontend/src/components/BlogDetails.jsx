import React, { useEffect, useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "32px",
        margin: "32px auto",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        maxWidth: "500px",
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
        width: "100%",
    },
    button: {
        marginTop: "24px",
        borderRadius: "8px",
        backgroundColor: "#64B5F6",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#42a5f5",
        },
    },
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
    },
});

const BlogDetails = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });

    const handleChange = (event) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const sendRequest = async () => {
        const response = await axios
            .put(`https://react-blog-api-three.vercel.app//api/blog/update/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
            })
            .catch((error) => {
                console.log({ error });
            });
        const data = await response?.data;
        return data;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest().then(() => navigate("/myBlogs"));
    };

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await axios.get(`https://react-blog-api-three.vercel.app//api/blog/${id}`).catch((err) => {
                console.error({ err });
            });
            const data = await response?.data;
            return data;
        };

        fetchDetails().then((data) => {
            setInputs({
                title: data.blog.title,
                description: data.blog.description,
                image: data.blog.image,
            });
        });
    }, [id]);

    return (
        <div className={classes.pageContainer}>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box className={classes.container}>
                        <Typography variant="h4" className={classes.title}>
                            Edit This Blog
                        </Typography>
                        <InputLabel className={classes.label}>Title</InputLabel>
                        <TextField
                            name="title"
                            value={inputs.title}
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            className={classes.input}
                        />
                        <InputLabel className={classes.label}>
                            Description
                        </InputLabel>
                        <TextField
                            name="description"
                            value={inputs.description}
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            className={classes.input}
                        />
                        <InputLabel className={classes.label}>
                            Image URL
                        </InputLabel>
                        <TextField
                            name="image"
                            value={inputs.image}
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            className={classes.input}
                        />
                        <Button
                            type="submit"
                            className={classes.button}
                            variant="contained"
                        >
                            Update This Blog
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default BlogDetails;
