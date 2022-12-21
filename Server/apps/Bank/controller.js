const { bankAccount, employee } = require("../../data/models");
const { ResponseModel } = require("../../utilities/responseModel");


module.exports = {
    allBankDetails : async(req,res)=>{
        console.log(req.params);
        const {id} = req.params
        try{const result = await bankAccount.findOne({
            where : {
                employee_id : id
            },
            include : {
                model : employee,
                required : true
            }
        });
        res.json(new ResponseModel(result));}
        catch(err){
            res.json(new ResponseModel(null,null,["No Data Found"]));
        }
    }
}