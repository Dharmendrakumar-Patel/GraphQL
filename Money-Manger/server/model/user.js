import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username."],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please provide a name."]
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: [6, "Password must be at least 6 characters long."]
    },
    profilePicture: {
        type: String,
        required: [true, "Please provide a profile picture."]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please provide a gender."]
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
