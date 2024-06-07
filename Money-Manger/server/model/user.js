import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "provide an username."],
        unique: true
    },
    name: {
        type: String,
        require: [true, "provide a name."],
    },
    password: {
        type: String,
        require: [true, "provide a password."],
        minlength: [6, "atleast enter 6 length password."]
    },
    profilePicture: {
        type: String,
        require: [true, "provide a profile picture."],
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        require: [true, "provide a gender."],
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User