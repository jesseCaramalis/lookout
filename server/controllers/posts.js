import User from "../models/User.js";
import cloudinary from "../middleware/cloudinary.js";
import Post from "../models/Post.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, image } = req.body; //all the front end will send
        const result = await cloudinary.uploader.upload(image);
        const user = await User.findById(userId); //gets user info for user that posted
        const newPost = new Post({
            userId,
            store: user.store,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.store,
            description,
            image: result.secure_url,
            cloudinaryId: result.public_id,
        })
        await newPost.save(); //saves post to mongoDB
        
        await Store.findOneAndUpdate({ _id: user.store }, { $push: { posts: newPost._id }});

        const post = await Post.find(); //this returns ALL posts from DB and passing to front end, which will then have a list of all new updated posts.

        res.status(201).json(post);

    } catch (err) {
        res.status(409).json({ message: err.message})
    }
}

//READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(post);

    } catch(err){
        res.status(404).json({ message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(post);

    } catch(err){
        res.status(404).json({ message: err.message})
    }
}