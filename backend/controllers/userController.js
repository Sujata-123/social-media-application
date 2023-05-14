const { User } = require("../dbConfig/models");

exports.createUser = async (req, res) => {
  try {
    const { userName, email, password, image, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ msg: "password and confirm password not same" });
    }
    const newUser = new User({
      name: userName,
      email: email,
      password: password,
      image: image,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.status(200).json({ msg: savedUser, token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
};

// user login function
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ msg: "Please Enter correct email or password" });

    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).send({ error: "User not found" });

    if (!validUser.password)
      return res.status(400).send({
        error: "Please set your password first or try to login with google",
      });

    if (validUser.password !== password)
      return res.status(401).send({ error: "Incorrect password" });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const result = {
      email,
      token,
    };

    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ messege: error.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, bio, updated_at: Date.now() },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Post.deleteMany({ user_id: id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getNameId = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1, email: 1, bio: 1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
