const express = require('express');
const { addPayslip, viewPayslips, viewAllPayslipsget, viewAllPayslipspost } = require('./controllers/paySlipController');
const route = express.Router();

route.get("/addPaySlip",addPayslip);
route.get("/viewPaySlips",viewPayslips);
route.get("/viewAllPaySlips",viewAllPayslipsget);
route.post("/viewAllPaySlips",viewAllPayslipspost);

module.exports = route;