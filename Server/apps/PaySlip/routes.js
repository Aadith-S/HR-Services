const express = require('express');
const { addPayslip, viewPayslips, viewAllPayslipsget, viewAllPayslipspost, viewPayslipspost } = require('./controllers/paySlipController');
const route = express.Router();

route.post("/addPaySlip",addPayslip);
route.get("/viewPaySlips",viewPayslips);
route.get("/viewAllPaySlips",viewAllPayslipsget);
route.post("/viewAllPaySlips",viewAllPayslipspost);
route.get("/PaySlip",viewPayslipspost);
module.exports = route;