const { employee, companyMaster } = require("../../../data/models");
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
    }
}