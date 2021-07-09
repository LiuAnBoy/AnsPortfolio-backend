const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
  now: {
    type: Boolean,
    required: true,
  },
  description: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Experience = mongoose.model("experience", ExperienceSchema);

module.exports = Experience;
