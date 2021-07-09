const express = require("express");

const router = express.Router();

// Import Model
const Tag = require("../../models/Tag");
const Project = require("../../models/Project");

// @route   Get api/tag
// @desc    Get all tags
// @access  Public
router.get("/", async (req, res) => {
  try {
    const data = await Tag.find()
      .sort({ name: -1 })
      .populate("projects", ["name", "image"]);
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route   Get api/tag/:id
// @desc    Get a tags
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const data = await Tag.findOne({ _id: req.params.id }).populate(
      "projects",
      ["name", "image"]
    );
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route   Post api/tag
// @desc    Add New tag
// @access  Public
router.post("/", async (req, res) => {
  const { name } = req.body;

  const Data = new Tag({
    name,
  });

  try {
    const tag = await Data.save();
    return res.json(tag);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route   Delete api/tag/:id
// @desc    Delete a tag
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ msg: "Tag not found" });
    }

    const projects = await Project.find({ _id: tag.linkWith });
    if (projects.length > 0) {
      projects.forEach(async (p) => {
        const index = p.tags.indexOf(req.params.id);
        p.tags.splice(index, 1);
        await p.save();
      });
    }

    await tag.remove();
    return res.json({ msg: "Tag has removed!! " });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
