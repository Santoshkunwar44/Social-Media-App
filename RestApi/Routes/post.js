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

//GET TIMELINE POST
router.get("/timeline/all", async (req, res) => {
  try {
    const currUser = await User.findById(req.body.userId);
    const currUserPost = await Post.find({ userId: currUser._id });
    const followesPost = await Promise.all(
      currUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    let postArray = Object.assign([], currUserPost, followesPost);
    res.status(200).send(postArray);
  } catch (err) {
    res.status(500).send({ success: false, message: err });
  }
});

module.exports = router;
