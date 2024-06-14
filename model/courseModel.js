const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  enrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;