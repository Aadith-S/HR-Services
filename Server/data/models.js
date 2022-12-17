const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  username: "root",
  host: "localhost",
  dialect: "mysql",
  password: "pass@123",
  database: "test",
});
const companyMaster = sequelize.define("companyMaster", {
  //(pk in this table is a Fkey in employee table)
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  designation: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  monthlyPay: {
    type: DataTypes.INTEGER,
    allowed: false,
  },
});

const workingDays = sequelize.define("workingDay", {
  month_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  month: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING(4),
    allowed: false,
  },
  workingDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  days: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
});
const employee = sequelize.define("employee", {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  superior1: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  superior2: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: companyMaster,
      key: "role_id",
    },
  },
  //role_id(fkey from company master table)
});
const loginCredentials = sequelize.define("loginCredential", {
  login_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: employee,
      key: "employee_id",
    },
  },
  //employee_id is a Fkey in this table
  //(unique, null not allowed)
});

const leaveReq = sequelize.define("leaveReq", {
  req_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  to: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  approvalStatus: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "employee_id",
    },
  },
});
const bankAccount = sequelize.define("bankAccount", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  ifsc: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "employee_id",
    },
  },
  //employee_id is a fkey from employee table
});

const attendence = sequelize.define("attendence", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  leaves: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "employee_id",
    },
  },
  month_id: {
    type: DataTypes.INTEGER,
    references: {
      model: workingDays,
      key: "month_id",
    },
  },
  //employee_id is a fkey from employee table
});
const Feedback = sequelize.define("Feedback", {
  feedback_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  feedback: {
    type: DataTypes.STRING(200),
  },
  month_id: {
    type: DataTypes.INTEGER,
    references: {
      model: workingDays,
      key: "month_id",
    },
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "employee_id",
    },
  },
});
const paySlip = sequelize.define("paySlip", {
  pay_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amountPaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attendence_id: {
    type: DataTypes.INTEGER,
    references: {
      model: attendence,
      key: "id",
    },
  },
  //employee_id(Fkey from employee)
});
companyMaster.hasMany(employee, {
  foreignKey: "role_id",
  sourceKey: "role_id",
});
employee.belongsTo(companyMaster, {
  foreignKey: "role_id",
  targetKey: "role_id",
});
employee.hasOne(loginCredentials, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
});
loginCredentials.belongsTo(employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
});
employee.hasMany(leaveReq, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
});
leaveReq.belongsTo(employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
});
employee.hasMany(attendence, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
});
attendence.belongsTo(employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
});
workingDays.hasMany(attendence, {
  foreignKey: "month_id",
  sourceKey: "month_id",
});
attendence.belongsTo(workingDays, {
  foreignKey: "month_id",
  targetKey: "month_id",
});
employee.hasOne(bankAccount, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
});
bankAccount.belongsTo(employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
});
workingDays.hasMany(Feedback, {
  foreignKey: "month_id",
  sourceKey: "month_id",
});
Feedback.belongsTo(workingDays, {
  foreignKey: "month_id",
  targetKey: "month_id",
});
employee.hasOne(Feedback, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
});
Feedback.belongsTo(employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
});
attendence.hasOne(paySlip, {
  foreignKey: "attendence_id",
  sourceKey: "id",
});
paySlip.belongsTo(attendence, {
  foreignKey: "attendence_id",
  targetKey: "id",
});
module.exports = {
  employee,
  leaveReq,
  loginCredentials,
  companyMaster,
  workingDays,
  paySlip,
  bankAccount,
  attendence,
  Feedback,
};

module.exports.sequelize = sequelize;
