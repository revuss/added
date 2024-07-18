const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, "username required"],
  },
  email: {
    type: String,
    require: [true, "Email required"],
    unique: true,
    validate: [validator.isEmail, "email not valid"],
  },
  password: {
    type: String,
    require: [true, "password required"],
    minlength: [8, "password less than 8 chars"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
