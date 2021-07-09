const express = require("express");

const router = express.Router();

// Import Model
const Experience = require("../../models/Experience");

// @route   Get api/experience
// @desc    Get all experience
// @access  Public
router.get("/", async (req, res) => {
  try {
    const data = await Experience.find().sort({ createAt: -1 });
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/experience
// @desc    Create a experience
// @access  Public
router.post("/", async (req, res) => {
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
    const exp = await Data.save();
    res.json(exp);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/experience/:id
// @desc    Delete a experience
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    // Check experience
    if (!experience) {
      return res.status(404).json({ msg: "Experience not found" });
    }

    await experience.remove();

    return res.json({ msg: "Experience has removed!!" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Experience not found" });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
