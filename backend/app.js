// Uncomment if you are using environment variables
// import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(
    cors({
        origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

const mongoURI =
    process.env.MONGO_URI ||
    "mongodb+srv://ashifali2327:Ashif2327@blog.ez6fb5e.mongodb.net/Blog?retryWrites=true&w=majority";

mongoose
    .connect(mongoURI)
    .then(() => {
        app.listen(5000, () => {
            console.log("Connection established");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
