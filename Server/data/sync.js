const { companyMaster, employee, workingDays, loginCredentials, attendence, bankAccount, leaveReq, paySlip, Feedback } = require("../../../../Downloads/db (1)");

companyMaster.sync();
employee.sync();
workingDays.sync();
loginCredentials.sync();
attendence.sync();
bankAccount.sync();
leaveReq.sync();
paySlip.sync();
Feedback.sync();