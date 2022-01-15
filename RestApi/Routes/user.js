const User = require("../Model/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      try {
      } catch (err) {
        return res.status(500).send({ success: false, message: err });
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res
        .status(200)
        .send({ success: true, message: "Your account has been updated " });
    } catch (err) {
      return res.status(500).send({ success: false, message: err });
    }
  } else {
    return res
      .status(403)
      .send({ success: false, message: "You can update only your account" });
  }
});

//DELELTE USER

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.deleteOne({ _id: req.params.id });

      res
        .status(200)
        .send({ success: true, message: "Your account has been deleted " });
    } catch (err) {
      return res.status(500).send({ success: false, message: err });
    }
  } else {
    return res
      .status(403)
      .send({ success: false, message: "You can delete only your account" });
  }
});

//GET USER

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send({ success: true, message: others });
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});

//FOLLOW USER

router.put("/:id/follow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currUser.updateOne({ $push: { followings: req.params.id } });
        return res
          .status(200)
          .send({ success: true, message: "Successfully followed" });
      } else {
        return res
          .status(403)
          .send({ success: false, message: "You have already followed" });
      }
    } catch (err) {
      return res.status(500).send({ success: false, message: err });
    }
  } else {
    res
      .status(403)
      .send({ success: false, message: "You can't follow yourself" });
  }
});


//UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currUser.updateOne({ $pull: { followings: req.params.id } });
        return res
          .status(200)
          .send({ success: true, message: "Successfully unfollowed" });
      } else {
        return res
          .status(403)
          .send({ success: false, message: "You have not  followed" });
      }
    } catch (err) {
      return res.status(500).send({ success: false, message: err });
    }
  } else {
    res
      .status(403)
      .send({ success: false, message: "You can't unfollow yourself" });
  }
});



module.exports = router;
