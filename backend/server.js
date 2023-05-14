const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRouter = require("./routes/postRouter");
const mongooseConnection = require("./dbConfig/mongodbConfig");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const app = express();
const cors = require("cors");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// app.use(mongoSanitize());

app.use("/users", userRoutes);
app.use("/posts", postRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
