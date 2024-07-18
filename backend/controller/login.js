const { comparePass } = require("../middleware/hashPassword");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const match = await comparePass(password, user.password);

    if (!match) {
      return res.status(404).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({ id: user._id, username: user.username });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
module.exports = login;
