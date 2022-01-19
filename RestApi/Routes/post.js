const router = require("express").Router();
const Post = require("../Model/Post");
const User = require("../Model/User");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).send({ success: true, message: "Post saved" });
  } catch (err) {
    res.status(500).send({ success: false, err });
  }
});

//UPDATE POST /:id post id
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send({ success: true, message: "Post updated " });
    } else {
      res
        .status(403)
        .send({ success: false, message: "You can update only your post" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).send({ success: true, message: "Post deleted " });
    } else {
      res
        .status(403)
        .send({ success: false, message: "You can delete only your post" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});

//LIKE THE POST &&
// UNLIKE THE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send({ success: true, message: "You liked the post" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send({ success: true, message: "You unliked the post" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});

// GET THE POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({ success: true, post });
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});

// GET THE ALL POST OF THE USER'S

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userId: user._id });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});
//GET TIMELINE POST

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
