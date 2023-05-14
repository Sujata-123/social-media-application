const jwt = require("jsonwebtoken");
const express = require("express");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).send({ error: "Token not present" });
    }

    verifyToken = jwt.verify(token, JWT_SECRET);

    const rootUser = await userDB.findById({ _id: verifyToken.id });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(500).send({ error: "Unauthorized token access" });
  }
};

// authorization
const isAuthorized = async (req, res, next) => {
  try {
    const currentUser = req.params.userId;
    const rootUser = req.rootUser._id;

    if (currentUser != rootUser.toString()) {
      return res.status(401).send({ error: "Not authorized" });
    }

    next();
  } catch (error) {
    res.status(500).send({ error: "Unauthorized token access" });
  }
};

module.exports = { authenticate, isAuthorized };
