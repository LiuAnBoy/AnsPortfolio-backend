const express = require("express");

const router = express.Router();

// Import Model
const Profile = require("../../models/Profile");

// @route   Get api/profile
// @desc    Get Profile
// @access  Public
router.get("/", async (req, res) => {
  try {
    const data = await Profile.findOne();
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   Post api/profile
// @desc    Post Profile or Update
// @access  Public
router.post("/", async (req, res) => {
  const {
    avatar,
    name,
    position,
    description,
    email,
    skills,
    lineId,
    github,
    linkedin,
    line,
  } = req.body;

  const profileData = {};
  if (avatar) profileData.avatar = avatar;
  if (name) profileData.name = name;
  if (position) profileData.position = position;
  if (description) profileData.description = description;
  if (email) profileData.email = email;
  if (skills) profileData.skills = skills.split(",").map((s) => s.trim());
  if (lineId) profileData.lineId = lineId;

  profileData.social = {};
  if (github) profileData.social.github = github;
  if (linkedin) profileData.social.linkedin = linkedin;
  if (line) profileData.social.line = line;

  try {
    let profile = await Profile.findOne({ name: req.body.name });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { name: req.body.name },
        { $set: profileData },
        { new: true }
      );

      return res.json(profile);
    }
    profile = new Profile(profileData);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
