const express = require("express");

const router = express.Router();

// Import Model
const Experience = require("../../models/Experience");

// @route   Get api/experience
// @desc    Get all experience
// @access  Public
router.get("/experience", async (req, res) => {
  try {
    const data = await Experience.find({}, { __v: 0, createAt: 0 }).sort({
      createAt: -1,
    });
    res.status(200).send(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/experience
// @desc    Create a experience
// @access  Public
router.post("/experience", async (req, res) => {
  const { company, position, start, end, now, description } = req.body;

  const Data = new Experience({
    company,
    position,
    start,
    end,
    now,
    description,
  });

  try {
    await Data.save();
    res.status(200).send("Save success!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/experience/:id
// @desc    Delete a experience
// @access  Public
router.delete("/experience/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    // Check experience
    if (!experience) {
      return res.status(404).send("Experience not found");
    }

    await experience.remove();

    return res.status(200).send("Experience has removed!!");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send("Experience not found");
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
