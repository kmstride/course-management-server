const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    role: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
});

const User = mongoose.model("User", userSchema);

module.exports = User