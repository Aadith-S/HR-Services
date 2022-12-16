const express = require('express');
const route = express.Router();
const lc = require("./controllers/LoginController")
route.post("/login",lc.verifyLogin);
module.exports = route;