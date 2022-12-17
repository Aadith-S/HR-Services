const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const frouter = require("./apps/Feedback/routes");
const lorouter = require("./apps/Login/routes");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const lerouter = require("./apps/Leave/routes");
const arouter = require("./apps/Attendance/routes");
const prouter =  require("./apps/PaySlip/routes")
dotEnv.config();
const app = express();

app.use(bodyParser.json({inflate : true}));
app.use(authMiddleware);
app.use("/api",frouter);
app.use("/api",lorouter);
app.use("/api",lerouter);
app.use("/api",arouter);
app.use("/api",prouter);

app.listen(80);