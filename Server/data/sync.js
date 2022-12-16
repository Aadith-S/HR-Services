const { companyMaster, employee, workingDays, loginCredentials, attendence, bankAccount, leaveReq, paySlip, Feedback } = require("../data/models");

companyMaster.sync();
employee.sync();
workingDays.sync();
loginCredentials.sync();
attendence.sync();
bankAccount.sync();
leaveReq.sync();
paySlip.sync();
Feedback.sync();