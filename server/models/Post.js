import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role : { type: String, required: true },
        likes: { type: Array, default: [] },
        //likes: { type: Map, of: Boolean,}
        comments: { type: Array, default: [] },
    },
    { timestamps: true }                                      //This will automatically add createdAt and updatedAt fields to our schema
    );

const Post = mongoose.model("Post", postSchema);
export default Post;