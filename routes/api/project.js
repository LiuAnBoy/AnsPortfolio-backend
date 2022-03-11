const express = require("express");

const router = express.Router();

// Import Model
const Project = require("../../models/Project");
const Tag = require("../../models/Tag");

// @route   Get api/project
// @desc    Get all project
// @access  Public
router.get("/projects", async (req, res) => {
  try {
    if (req.query.tags) {
      const tags = req.query.tags.split(",");
      const data = await Project.aggregate([
        {
          $lookup: {
            from: Tag.collection.name,
            localField: "tags",
            foreignField: "_id",
            as: "tags",
          },
        },
        { $match: { "tags.name": { $all: tags } } },
        {
          $group: {
            _id: "$_id",
            // createAt: { $first: "$createAt" },
            image: { $first: "$image" },
            name: { $first: "$name" },
            description: { $first: "$description" },
            company: { $first: "$company" },
            number: { $first: "$number" },
            tags: { $first: "$tags" },
          },
        },
        {
          $sort: { number: -1 },
        },
        {
          $project: { "tags.createAt": 0, "tags.projects": 0, "tags.__v": 0 },
        },
      ]);
      return res.status(200).send(data);
    }

    const data = await Project.find({}, { __v: 0 })
      .sort({ number: -1 })
      .populate({
        path: "tags",
        select: "name",
      });

    return res.status(200).send(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Get api/project
// @desc    Get a project by id
// @access  Public
router.get("/project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "tags",
      "name"
    );

    if (!project) {
      return res.status(404).send("Project not found");
    }

    return res.status(200).send(project);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send("Project not found");
    }
    return res.status(500).send(error.message);
  }
});

// @route   Get api/projects/featured
// @desc    Get a all featured projects
// @access  Public
router.get("/projects/featured", async (req, res) => {
  try {
    const data = await Project.find({ featured: true }, { __v: 0, createAt: 0 })
      .sort({ number: -1 })
      .populate("tags", "name");

    if (data.length === 0) {
      return res.status(404).send("No featured project found");
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
router.post("/project", async (req, res) => {
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

  const Data = new Project({
    image,
    number,
    name,
    company,
    introduce,
    description,
    featured,
    url,
  });

  tags.map((tag) => Data.tags.unshift(tag));

  // TODO Update Tags

  try {
    const project = await Data.save();

    // Save Project ID into each Tag collection
    if (tags.length > 0) {
      const tagObj = await Tag.find({ _id: { $in: tags } });
      tagObj.forEach(async (item) => {
        item.projects.unshift(project._id);
        await item.save();
      });
    }

    return res.status(200).send(project);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
});

// @route   Delete api/project/:id
// @desc    Delete a project
// @access  Public
router.delete("/project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json("Project not found");
    }

    if (project.tags.length > 0) {
      const tagObj = await Tag.find({ _id: { $in: project.tags } });
      tagObj.forEach(async (obj) => {
        const index = obj.projects.indexOf(req.params.id);
        obj.projects.splice(index, 1);
        await obj.save();
      });
    }

    await project.remove();
    return res.status(200).send("Project has removed");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json("Project not found");
    }
    return res.status(500).send(error.message);
  }
});

module.exports = router;
