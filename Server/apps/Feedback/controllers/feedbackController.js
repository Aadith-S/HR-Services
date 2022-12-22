
const {Feedback, workingDays, employee} = require("../../../data/models");
const {ResponseModel} = require("../../../utilities/responseModel")

module.exports = {
    addFeedback : async(req,res)=>{
        const {feedback} = req.body;
        const date = new Date();
        var month =(date.getMonth()+1).toString();
        var year =date.getFullYear().toString();
        console.log(month +" "+year);
        var monthId = await workingDays.findOne({
            where : {
                month : month,
                year : year
            }
        })
        console.log(req.user.employee_id);
        console.log(req.body);
        console.log(monthId);
        try{
            const result = Feedback.create({
                feedback : feedback,
                month_id : monthId.dataValues.month_id,
                employee_id : req.user.employee_id
            })
            res.json(new ResponseModel(result))
        }
        catch(err){
            res.json(new ResponseModel(null,null,["Feedback couldn't be created"]));
        }
    },
    findAllFeedbacks : async(req,res)=>{
        // const {month,year} = req.body;
        try{
            // if(month == "" || year == ""){
                var result = await Feedback.findAll({
                    include : {
                        model : employee,
                        required : true
                    }
                });
            // }
            // else{
            //     var result = await Feedback.findAll({where : {
            //         month : month,
            //         year : year
            //     }})
            // }
        }
        catch(err){
            res.json(new ResponseModel(null,null,["Error Occured"]))
        }
        console.log(result);
        if(result.length == 0){
            res.json(new ResponseModel(null,null,["No data found"]));
        }
        else{
        res.json(new ResponseModel(result));
        }
    }
}