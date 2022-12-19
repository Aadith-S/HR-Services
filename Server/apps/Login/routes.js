const express = require("express");
const { redirect } = require("./controllers/LoginController");
const route = express.Router();
const lc = require("./controllers/LoginController");

route.post("/login", lc.verifyLogin);
route.get("/redirect",redirect);

module.exports = route;
