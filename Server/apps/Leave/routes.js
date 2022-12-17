const express = require('express');
const route = express.Router();
const lc = require("./controllers/leaveController")
route.post("/addLeaveRequest",lc.addLeaveRequest);
route.get("/allLeaveRequests",lc.alleaveRequestsget);
route.get("/viewLeaveRequests",lc.viewLeaveRequests);
route.post("/viewLeaveRequests",lc.alleaveRequestspost);
route.get("/leaveApproval",lc.leaveApprovalget);
route.post("/leaveApproval",lc.leaveApprovalpost)

module.exports = route;
