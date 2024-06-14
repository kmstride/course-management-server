const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

module.exports = {
  userDataRegister: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: { ...req.body },
        },
        {
          new: true,
          upsert: true,
        }
      );
      const userData = { email: user.email, id: user._id };
      const authToken = jwt.sign(userData, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ message: "User Registration Successfully!", authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error Occurd!", error });
    }
  },
  userLogin: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const userData = { email: user.email, id: user._id };
      const authToken = jwt.sign(userData, process.env.JWT_SECRET);
      res.status(200).json({ message: "User Login Successfully!", authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error Occurd!", error });
    }
  },
};
