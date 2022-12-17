const { where } = require("sequelize");
const { attendence, paySlip, workingDays, employee, companyMaster } = require("../../../data/models");
const { ResponseModel } = require("../../../utilities/responseModel");
function getSal(sal,workingDays,leaves){
    console.log(sal);
    return ((sal/workingDays)*(workingDays-leaves))
}
module.exports = {
    addPayslip : async(req,res)=>{
        const attendences = await attendence.findAll({
                include : [{
                    model : workingDays,
                    required: true
                },
                {
                  model : employee,
                  required: true,
                  include : [{
                    model : companyMaster,
                    required: true
                  }]
                }]
            });
        attendences.forEach(async(attns)=>{
            var result = await paySlip.findAll({
                where : {
                    attendence_id : attns.dataValues.id
                }
            });
            console.log(result);
            if(result.length == 0){
                console.log("In here");
                await paySlip.create({
                    attendence_id : attns.dataValues.id,
                    amountPaid : getSal(attns.employee.companyMaster.monthlyPay,attns.workingDay.workingDays,attns.leaves)
                })
            }
            else{
                await paySlip.update({
                    amountPaid : getSal(attns.employee.companyMaster.monthlyPay,attns.workingDay.workingDays,attns.leaves)
                },{
                    where : {
                        attendence_id : attns.dataValues.id
                    }
                })
            }
        })
        res.json(new ResponseModel("Pay Slips Created"))
    },
    viewPayslips: async(req,res)=>{
        const result = await paySlip.findAll({
            include : {
                model : attendence,
                required : true,
                include : [{
                    model : employee,
                    required : true,
                    where : {
                        employee_id : req.user.employee_id
                    }
                }]
            }
        })
        res.json(new ResponseModel(result));
    }
    ,
    viewAllPayslipsget: async(req,res)=>{
        const result = await paySlip.findAll({
            include : {
                model : attendence,
                required : true,
                include : [{
                    model : employee,
                    required : true
                }]
            }
        })
        res.json(new ResponseModel(result));
    },
    viewAllPayslipspost: async(req,res)=>{
        const {employee_id} = req.body;
        const result = await paySlip.findAll({
            include : {
                model : attendence,
                required : true,
                include : [{
                    model : employee,
                    required : true,
                    where : {
                        employee_id : employee_id
                    }
                }]
            }
        })
        res.json(new ResponseModel(result));
    }
}