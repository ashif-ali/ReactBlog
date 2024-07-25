import React from "react";
import {
    Box,
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    font: {
        fontFamily: "Arial, sans-serif",
    },
});

const Blog = ({ title, description, imageUrl, userName, isUser, id }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`);
    };

    const deleteRequest = async () => {
        const response = await axios
            .delete(`https://reactblog-pr8l.onrender.com/api/blog/${id}`)
            .catch((error) => {
                console.log({ error });
            });
        const data = await response?.data;
        return data;
    };

    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate("/"))
            .then(() => navigate("/blogs"));
    };

    return (
        <React.Fragment>
            <Card
                sx={{
                    width: "40%",
                    margin: "auto",
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc",
                    "&:hover": {
                        backgroundColor: "lightgray",
                        boxShadow: "10px 10px 20px #555",
                    },
                }}
            >
                {isUser && (
                    <Box display="flex" sx={{ marginLeft: "auto" }}>
                        <IconButton
                            sx={{ marginLeft: "auto" }}
                            onClick={handleEdit}
                        >
                            <ModeEditOutlineIcon color="warning" />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteForeverIcon color="error" />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ backgroundColor: "blue", width: "auto" }}
                            aria-label="avatar"
                            variant="rounded"
                            className={classes.font}
                        >
                            {userName}
                        </Avatar>
                    }
                    title={title}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent>
                    <hr />
                    <br />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className={classes.font}
                    >
                        <b>{userName}</b>
                        {": "}
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default Blog;
