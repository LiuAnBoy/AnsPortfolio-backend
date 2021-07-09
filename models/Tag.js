const mongoose = require("mongoose");

const { Schema } = mongoose;

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.model("tag", TagSchema);

module.exports = Tag;
