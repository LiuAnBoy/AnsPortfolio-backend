const express = require('express');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Import Model
const Project = require('../../models/Project');
const Tag = require('../../models/Tag');

// @route   Get api/project
// @desc    Get all project
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      const data = await Project.aggregate([
        {
          $lookup: {
            from: Tag.collection.name,
            localField: 'tags',
            foreignField: '_id',
            as: 'tags',
          },
        },
        { $match: { 'tags.name': { $all: tags } } },
        {
          $group: {
            _id: '$_id',
            createdAt: { $first: '$createdAt' },
            image: { $first: '$image' },
            name: { $first: '$name' },
            description: { $first: '$description' },
            company: { $first: '$company' },
            number: { $first: '$number' },
            url: { $first: '$url' },
            introduce: { $first: '$introduce' },
            tags: { $first: '$tags' },
            updatedAt: { $first: '$updatedAt' },
            featured: { $first: '$featured' },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: { 'tags.createdAt': 0, 'tags.projects': 0, 'tags.__v': 0 },
        },
        {
          $addFields: { updatedAt: { $last: '$updatedAt' } },
        },
      ]);
      return res.status(200).send(data);
    }

    const data = await Project.aggregate([
      {
        $lookup: {
          from: Tag.collection.name,
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      },
      {
        $group: {
          _id: '$_id',
          createdAt: { $first: '$createdAt' },
          image: { $first: '$image' },
          name: { $first: '$name' },
          description: { $first: '$description' },
          company: { $first: '$company' },
          number: { $first: '$number' },
          url: { $first: '$url' },
          introduce: { $first: '$introduce' },
          tags: { $first: '$tags' },
          updatedAt: { $first: '$updatedAt' },
          featured: { $first: '$featured' },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: { 'tags.createdAt': 0, 'tags.projects': 0, 'tags.__v': 0 },
      },
      {
        $addFields: { updatedAt: { $last: '$updatedAt' } },
      },
    ]);

    return res.status(200).send(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Get api/project
// @desc    Get a project by id
// @access  Public
router.get('/project/:number', async (req, res) => {
  try {
    const project = await Project.findOne(
      {
        number: req.params.number,
      },
      { __v: 0, createdAt: 0, updatedAt: 0, views: 0 }
    ).populate('tags', 'name');

    if (!project) {
      return res.status(404).send('Project not found');
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).send('Project not found');
    }
    return res.status(500).send(error.message);
  }
});

// @route   Get api/projects/featured
// @desc    Get a all featured projects
// @access  Public
router.get('/projects/featured', async (req, res) => {
  try {
    const data = await Project.find(
      { featured: true },
      { __v: 0, createdAt: 0 }
    )
      .sort({ createdAt: -1 })
      .populate('tags', 'name');

    if (data.length === 0) {
      return res.status(404).send('No featured project found');
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Post api/project
// @desc    Create project
// @access  Public
router.post('/project', async (req, res) => {
  const {
    image,
    number,
    name,
    company,
    introduce,
    description,
    featured,
    url,
    tags,
  } = req.body;

  try {
    const Data = new Project({
      image: image ? image : 'https://fakeimg.pl/500x400/?text=Empty',
      number,
      name,
      company,
      introduce,
      description,
      featured,
      url,
      tags,
    });

    const project = await Data.save();

    return res.status(200).send(project);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Patch api/project/:id
// @desc    Update Project
// @access  Public
router.patch('/project/:number', async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { number: req.params.number },
      { $push: { updatedAt: Date.now() }, ...req.body },
      {
        new: true,
      }
    );

    if (!project) {
      return res.status(404).send('Project not found.');
    }

    return res.status(200).send('更新成功');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Patch api/project/featured/:id
// @desc    Update Project featured
// @access  Public
router.patch('/project/featured/:number', async (req, res) => {
  const { featured } = req.body;

  try {
    const project = await Project.findOneAndUpdate(
      { number: req.params.number },
      { featured },
      { new: true }
    );

    if (!project) {
      return res.status(404).send('Project not found.');
    }

    return res.status(200).send('更新成功');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Delete api/project/:id
// @desc    Delete a project
// @access  Public
router.delete('/project/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json('Project not found.');
    }

    await project.remove();
    return res.status(200).send('Project has removed');
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json('Project not found');
    }
    return res.status(500).send(error.message);
  }
});

module.exports = router;
