const { companyMaster, employee, workingDays, loginCredentials, attendence, bankAccount, leaveReq, paySlip, Feedback, roleInfo } = require("../data/models");

roleInfo.sync();
companyMaster.sync();
workingDays.sync();
employee.sync();
attendence.sync();
bankAccount.sync();
leaveReq.sync();
paySlip.sync();
Feedback.sync();
loginCredentials.sync({alter : true});