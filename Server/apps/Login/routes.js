const express = require("express");
const { redirect } = require("./controllers/LoginController");
const route = express.Router();
const lc = require("./controllers/LoginController");

route.post("/login", lc.verifyLogin);
route.post("/redirect",redirect);

module.exports = route;
