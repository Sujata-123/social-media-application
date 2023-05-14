const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Connect to the database

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo server"))
  .catch((e) => console.log("Couldn't connect to mongodb", e));

module.exports = mongoose.connection;
