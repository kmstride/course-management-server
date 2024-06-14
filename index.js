const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//external routes
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/course", require("./routes/courseRoute"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully" });
});

app.listen(port, async () => {
  console.log(`Server is running at port: ${port}`);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
});
