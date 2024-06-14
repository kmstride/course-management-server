const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  amount: {
    type: Number,
    required: true
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;