import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            required: true,
        },
        storeNumber: {
            type: Number,
            required: true,
        },
        incidents: {
            type: Array,          
        },

    },
    { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema)

export default Store;