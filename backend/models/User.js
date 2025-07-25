const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter product name"]
        },

        password: {
            type: String,
            required: [true, "Please enter a password"]
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        }
    },

    {
        timestamps: true


    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;