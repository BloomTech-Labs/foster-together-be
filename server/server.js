
const server = require("express")(),
  json = require("express").json(),
  morgan = require("morgan")("dev"),
  helmet = require("helmet")(),
  loginRouter = require("./login"),
  logoutRouter = require("./logout"),
  registerRouter = require("./registerAdmin"),
  membersRouter = require("./members/member-router"),
  backgroundRouter = require("./background"),
  applicationRouter = require("./application"),
  neighborRouter = require('./neighborTraining/neighbor-router')


const cors = require("cors");


server.use(json, morgan, helmet);
server.use(cors());
server.use("/login", loginRouter);
server.use("/logout", logoutRouter);
server.use("/register", registerRouter);
server.use("/members", membersRouter);
server.use("/background", backgroundRouter);
server.use("/application", applicationRouter);
server.use('/training', neighborRouter);

server.get("/", (req, res) => {
  res.status(200).json({ Server: "Running" });
});

module.exports = server;
