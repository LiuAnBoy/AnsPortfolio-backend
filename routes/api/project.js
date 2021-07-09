const express = require("express");

const router = express.Router();

// Import Model
const Project = require("../../models/Project");
const Tag = require("../../models/Tag");

// @route   Get api/project
// @desc    Get all project
// @access  Public
router.get("/", async (req, res) => {
  try {
    const data = await Project.find()
      .sort({ number: -1 })
      .populate("tags", "name");
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/project
// @desc    Get a project by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "tags",
      "name"
    );

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    return res.json(project);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    return res.status(500).send("Server Error");
  }
});

// @route   Post api/project
// @desc    Create project
// @access  Public
router.post("/", async (req, res) => {
  const { image, number, name, company, description, featured, url, tags } =
    req.body;

  const Data = new Project({
    image,
    number,
    name,
    company,
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

    return res.json(project);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route   Delete api/project/:id
// @desc    Delete a project
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
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
    return res.json({ msg: "Project has removed!! " });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
