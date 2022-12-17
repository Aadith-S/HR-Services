const express = require('express');
const { addAttendance, viewAttendance,viewAllAttendanceget,viewAllAttendancepost } = require('./controllers/attendanceController');
const route = express.Router();

route.get("/addAttendance",addAttendance);
route.get("/viewAttendance",viewAttendance);
route.get("/viewAllAttendance",viewAllAttendanceget);
route.post("/viewAllAttendance",viewAllAttendancepost);

module.exports = route;