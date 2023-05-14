const { Post, User } = require("../dbConfig/models");

exports.createPost = async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't Exist or Invalid user ID" });
    }
    const newPost = new Post({
      user_id,
      content,
      likes: 0,
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Unable to create post" });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.content = content;
    post.updated_at = new Date();
    await post.save();
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await Post.deleteOne({ _id: postId });
    if (result.deletedCount === 1) {
      res.send(`Post ${postId} deleted successfully`);
    } else {
      res.status(404).send(`Post ${postId} not found`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.incrementLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.decrementLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes == 0) {
      return res.status(404).json({ message: "Can't unlike, it's already 0" });
    }
    post.likes = Math.max(post.likes - 1, 0);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(
      {},
      { _id: 1, content: 1, user_id: 1, likes: 1 }
    );
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
