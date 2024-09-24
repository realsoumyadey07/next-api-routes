import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
},{timestamps: true});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);