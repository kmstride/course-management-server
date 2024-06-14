const { userDataRegister, userLogin } = require("../contollers/userController");

const router = require("express").Router();

router.put("/updateUserData", userDataRegister);
router.post("/login", userLogin);

module.exports = router;