const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  name: {
    trim: true,
    type: String,
    unique: true,
  },
  trainId: {
    trim: true,
    type: Number,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  ],
  destination: {
    type: String,
    maxlength: 100,
  },
  startpoint: {
    type: String,
    maxlength: 100,
  },
  startDate: {
    type: Date,
  },
  reachDate: {
    type: Date,
  },
  seats: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("train", TrainSchema);
