const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const app = express();

app.use(authMiddleware);
app.use("/api");

app.listen(80);