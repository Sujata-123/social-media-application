const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.post("/:id/like", postController.incrementLikes);
router.post("/:id/unlike", postController.decrementLikes);
router.get("/", postController.getAllPosts);

module.exports = router;
