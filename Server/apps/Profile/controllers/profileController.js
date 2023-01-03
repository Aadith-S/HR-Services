const { employee, companyMaster, loginCredentials, bankAccount } = require("../../../data/models");
const { ResponseModel } = require("../../../utilities/responseModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    profile : async(req, res)=>{
        try{
            const result = await employee.findByPk(req.user.employee_id);
            res.json(new ResponseModel(result));
        }
        catch(err){
            res.json(new ResponseModel(null,null,["Error Occured",err]));
        }
    },
    allEmployees : async(req, res)=>{
        try{
            const result = await employee.findAll({
                include : {
                    model : companyMaster,
                    required : true
                }
            });
            res.json(new ResponseModel(result));
        }
        catch(err){
            res.json(new ResponseModel(null,null,["Error Occured",err]));
        }
    },
    addEmployees : async(req, res)=>{
        console.log("in add employees");
        console.log(req.body);
        try{
            var sup = null;
            const superior2 = await employee.findByPk(req.body.superior);
            if(!superior2){
                sup = null;
            }
            else{
                sup = superior2.dataValues.superior1;
            }
            const emp = await employee.create({
                name : req.body.name,
                address : req.body.address,
                department : req.body.dept,
                superior1 : req.body.superior,
                superior2 : sup,
                role_id : parseInt(req.body.desg_id)
            })
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                await loginCredentials.create({
                    email : req.body.email,
                    password : hash,
                    employee_id : emp.dataValues.employee_id,
                    role_id : parseInt(req.body.role_id)
                });
            });
            // await loginCredentials.create({
            //     email : req.body.email,
            //     password : req.body.password,
            //     employee_id : emp.dataValues.employee_id,
            //     role_id : parseInt(req.body.role_id)
            // });
            await bankAccount.create({
                account_number : req.body.accNo,
                ifsc : req.body.ifsc,
                bankName : req.body.BName,
                employee_id : parseInt(emp.dataValues.employee_id)
            })
            return res.json(new ResponseModel("ok"));
        }
        catch(err){
            res.json(new ResponseModel(null,null,['Error Creating User']));
        }
    },
    updateEmployee : async(req,res)=>{
            var sup = null;
            const superior2 = await employee.findByPk(req.body.superior);
            const cred = await loginCredentials.findOne({
                where : {
                    employee_id : req.body.id,
                }
            });
            if(!superior2){
                sup = null;
            }
            else{
                sup = superior2.dataValues.superior1;
            }
            const result = await employee.update({
                superior1 : req.body.superior,
                superior2 : sup,
                address : req.body.address,
                role_id : req.body.desg_id,
                department : req.body.dept
            },{
                where : {
                    employee_id : req.body.id
                }
            });
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                console.log(req.body.password);
                var pass = hash==undefined ? cred.dataValues.password : hash;
                console.log(hash);
                await loginCredentials.update({
                    email : req.body.email,
                    password : pass,
                    role_id : parseInt(req.body.role_id)
                },{
                    where : {
                        employee_id : req.body.id
                    }
                });
            });
            return res.json(new ResponseModel("success"));
    },
    currentEmployee : async(req,res)=>{
        console.log(req.params.id);
        const result = await employee.findByPk(req.params.id,
            {
                include : [{
                    model : loginCredentials,
                    attributes : ['email','role_id'],
                    required : true
                },{
                    model : bankAccount,
                    required : true
                }]
            });
        return res.json(new ResponseModel(result));
    }
}