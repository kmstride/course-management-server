const router = require("express").Router();
const verifyToken = require("../lib/verifyToken");
const {
  createCourse,
  getAllCourse,
  countCourseByUser,
  getCourseByUser,
  updateCourse,
  deleteCourse,
  countCourses,
  getCourseById,
} = require("../contollers/courseController");

router.post("/create", verifyToken, createCourse);
router.get("/courses", getAllCourse);
router.get("/count", countCourses);
router.get("/countCourseByUser", verifyToken, countCourseByUser);
router.get("/courseByUser", verifyToken, getCourseByUser);
router
  .route("/:id")
  .get(verifyToken, getCourseById)
  .put(verifyToken, updateCourse)
  .delete(verifyToken, deleteCourse);
module.exports = router;
