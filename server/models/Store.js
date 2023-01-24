import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            required: true,
        },    
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
    },
    { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema)

export default Store;