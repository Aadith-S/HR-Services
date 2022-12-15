const {Feedback, workingDays} = require("../../../data/models");
const {ResponseModel} = require("../../../utilities/responseModel")

module.exports = {
    addFeedback : async(req,res)=>{
        const {Feedback,month,year} = req.body;
        var monthId = await workingDays.findOne({
            where : {
                month : month,
                year : year
            }
        })
        try{
            const result = Feedback.create({
                Feedback : Feedback,
                month_id : monthId,
                user_id : req.user.user_id
            })
            result.json(new ResponseModel(result))
        }
        catch(err){
            result.json(new ResponseModel(null,null,["Feedback couldn't be created"]));
        }
    },
    findALlFeedbacks : async(req,res)=>{
        
    }
}