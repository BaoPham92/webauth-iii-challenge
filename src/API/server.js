// * SETTINGS & PKGS
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require('../Routes/Auth/auth-router');
const userRouter = require('../Routes/Users/user-router');
const settings = [express.json(), cors(), helmet()];
const server = express();
server.use(settings);

// * ROUTES
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.send(`<h1>Welcome to the end of the world.</h1>`);
});

module.exports = server;