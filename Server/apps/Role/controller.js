const { roleInfo, companyMaster } = require("../../data/models")
const { ResponseModel } = require("../../utilities/responseModel")


module.exports = {
    addRole : async(req,res)=>{
        try{
            const result = await roleInfo.create({
                role_name : req.body.role_name
            })
            return res.json(new ResponseModel(result));
        }catch(err){

        }
    },
    getRole : async(req, res)=>{
        try{
            const result = await roleInfo.findAll();
            return res.json(new ResponseModel(result));
        }
        catch(err){

        }
    },getdesig : async(req, res)=>{
        try{
            const result = await companyMaster.findAll();
            return res.json(new ResponseModel(result));
        }
        catch(err){

        }
    }
}