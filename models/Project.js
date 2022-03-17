const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  number: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  introduce: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: [
    {
      type: Date,
    },
  ],
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
