const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authencate");
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/login", userController.userLogin);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);
router.get("/", userController.getNameId);

module.exports = router;
