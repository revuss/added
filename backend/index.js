const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/DBconn");
const register = require("./routes/register");
const login = require("./routes/login");
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
ConnectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use("/user", register);
app.use("/user", login);

app.listen(PORT, () => {
  console.log(`Listening port at ${PORT}`);
});
