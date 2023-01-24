import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import healthCheck from "./routes/healthCheck.js"
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import { users, posts, stores } from "./data/index.js";
import Store from "./models/Store.js";

// CONFIGS
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// ROUTES
app.post("/posts", verifyToken, createPost);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use('/healthcheck', healthCheck);


// MONGOOSE
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
        // Store.insertMany(stores);
        // User.insertMany(users);
        // Post.insertMany(posts);
    }).catch((error) => console.log(`${error}: did not connect.`))