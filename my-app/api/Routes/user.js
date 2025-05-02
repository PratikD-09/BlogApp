const router = require('express').Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');
const path = require('path');


// UPDATE User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Handle profile image update if a new image is uploaded
    if (req.body.proImg) {
      req.body.proImg = req.body.proImg;  // Save the profile image name in the user's document
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,  // Update other fields
        },
        { new: true }
      );
      res.status(200).json(updatedUser);  // Return updated user
    } catch (err) {
      res.status(500).json(err);  // Return error if the update fails
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});


// DELETE User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        // Deleting user's posts (if any)
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET User (without password)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

