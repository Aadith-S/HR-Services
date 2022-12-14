const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("HR_Services","root","pass@123",{
  host : "localhost",
  dialect : "mysql"  
})
const credentials = sequelize.define("Credentials",{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : DataTypes.STRING(50),
        unique : true
    },
    password : {
        type : DataTypes.STRING(72),
        allowNull : false
    }
})
const EmpDetails = sequelize.define("EmpDetails",{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    firstName : {
        type : DataTypes.STRING(150),
        allowNull : false
    },
    lastName : {
        type : DataTypes.STRING(150),
        allowNull : false
    },
    gender : {
        type : DataTypes.STRING(1),
        allowNull : false
    },
    dob:{
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    designationId : {
        type : DataTypes.INTEGER,
        allowNull : true                                    
    }
})
const companyMaster = sequelize.define('companyMaster',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement : true
    },
    Designation : {
        type : DataTypes.STRING(20),
        allowNull : true
    },
    salary : {
        type : DataTypes.BIGINT,
        allowNull : true
    }
})