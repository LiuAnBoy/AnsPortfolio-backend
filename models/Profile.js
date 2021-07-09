const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  position: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  skills: [String],
  social: {
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    line: {
      type: String,
    },
  },
  lineId: {
    type: String,
  },
  view: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
