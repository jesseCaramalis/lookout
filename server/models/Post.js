import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        incidentType: {
            type: String,
            required: true,
        },

        location: String,
        description: String,
        dollarEstimate: Number,
        image: String,
        cloudinaryId: String,

    },
    { timestamps: true }
)

const Post = mongoose.model("Post", PostSchema);

export default Post;