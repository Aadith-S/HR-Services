const { employee, companyMaster, loginCredentials, bankAccount } = require("../../../data/models");
const { ResponseModel } = require("../../../utilities/responseModel");

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
        // try{
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
            
            await loginCredentials.create({
                email : req.body.email,
                password : req.body.password,
                employee_id : emp.dataValues.employee_id,
                role_id : parseInt(req.body.role_id)
            });
            await bankAccount.create({
                account_number : req.body.accNo,
                ifsc : req.body.ifsc,
                bankName : req.body.BName,
                employee_id : parseInt(emp.dataValues.employee_id)
            })
            return res.json(new ResponseModel("ok"));
        // }
        // catch(err){
        //     console.log("some error");
        // }
    }
}