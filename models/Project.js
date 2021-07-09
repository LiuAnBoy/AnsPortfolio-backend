const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  number: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  featured: {
    type: Boolean,
    required: true,
  },
  url: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
