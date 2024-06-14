const Course = require("../model/courseModel");
const mongoose = require("mongoose");

module.exports = {
  createCourse: async (req, res) => {
    const id = req.user.id;
    const course = await Course.create({ ...req.body, author: id });
    res.status(201).json({ message: "Course Created Successfully", course });
  },
  getAllCourse: async (req, res) => {
    const { page, size } = req.query;
    let courses;
    if (page || size) {
      courses = await Course.find({})
        .sort({ _id: -1 })
        .limit(parseInt(size))
        .skip(parseInt(size) * parseInt(page))
        .populate("author");
    } else {
      courses = await Course.find({}).sort({ _id: -1 }).populate("author");
    }

    res.status(200).json(courses);
  },
  countCourses: async (req, res) => {
    const count = await Course.countDocuments();
    res.status(200).json({ count });
  },
  countCourseByUser: async (req, res) => {
    const id = req.user.id;
    const count = await Course.countDocuments({
      author: new mongoose.Types.ObjectId(id),
    });
    res.status(200).json({ count });
  },
  getCourseById: async (req, res) => {
    try {
      const id = req.params.id;
      const course = await Course.findById(id).populate("author");
      res.status(200).json(course);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Course Not Found!" });
    }
  },
  getCourseByUser: async (req, res) => {
    const { page, size } = req.query;
    const id = req.user.id;
    let courses;
    if (page || size) {
      courses = await Course.find({ author: new mongoose.Types.ObjectId(id) })
        .sort({ _id: -1 })
        .populate("author")
        .limit(parseInt(size))
        .skip(parseInt(size) * parseInt(page));
    } else {
      courses = await Course.find({
        author: new mongoose.Types.ObjectId(id),
      })
        .populate("author")
        .sort({ _id: -1 });
    }
    res.status(200).json(courses);
  },
  updateCourse: async (req, res) => {
    try {
      const id = req.params.id;
      await Course.findByIdAndUpdate(
        id,
        {
          $set: { ...req.body },
        },
        { new: true }
      );
      res.status(200).json({ message: "Course Updated Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Course Not Found!" });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const id = req.param.id;
      const deleted = await Course.findOneAndDelete(id);
      res.status(200).json({ message: "Course Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal Server Error!" });
    }
  },
  enroleCourse: async (req, res) => {},
};
