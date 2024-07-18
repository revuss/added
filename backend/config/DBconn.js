const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected`);
  } catch (err) {
    console(`error at database connection Error : ${err}`);
  }
};

module.exports = ConnectDB;
