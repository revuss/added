const User = require("../models/User");
const { Hash } = require("../middleware/hashPassword");

const Register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existing = await User.findOne({ email: email });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await Hash(password);

    const user = new User({
      username,
      email,
      password: hashed,
    });

    await user.save();

    return res.status(201).json({ message: "Account created" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = Register;
