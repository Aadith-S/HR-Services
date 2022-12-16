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
            res.json(new ResponseModel(null,null,["Feedback couldn't be created"]));
        }
    },
    findAllFeedbacks : async(req,res)=>{
        const {month,year} = req.body;
        try{
            if(month == "" || year == ""){
                var result = await Feedback.findAll();
            }
            else{
                var result = await Feedback.findAll({where : {
                    month : month,
                    year : year
                }})
            }
        }
        catch(err){
            res.json(new ResponseModel(null,null,["Error Occured"]))
        }
        if(result.length == 0){
            res.json(new ResponseModel(null,null,["No data found"]));
        }
        res.json(new ResponseModel(result));
    }
}