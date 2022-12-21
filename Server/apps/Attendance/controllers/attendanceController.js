const {
  employee,
  attendence,
  workingDays,
  leaveReq,
} = require("../../../data/models");
const { Sequelize, Op } = require("sequelize");
const { ResponseModel } = require("../../../utilities/responseModel");

module.exports = {
  addAttendance: async (req, res) => {
    const emp = await employee.findAll({
      attributes: ["employee_id"],
    });
    const dates = await workingDays.findAll({
      attributes: ["month_id", "month", "year", "days"],
    });
    emp.forEach((empdata) => {
      dates.forEach(async (date) => {
        var result = await attendence.findOne({
          where: {
            employee_id: empdata.dataValues.employee_id,
            month_id: date.dataValues.month_id,
          },
        });
        console.log(dates);
        if (result) {
          const leaves = await leaveReq.findAll({
            attributes: [
              [Sequelize.fn("COUNT", Sequelize.col("req_id")), "NoOfLeaves"],
            ],
            where: {
              employee_id: empdata.dataValues.employee_id,
              from: {
                [Op.between]: [
                  date.dataValues.year + "-" + date.dataValues.month + "-01",
                  date.dataValues.year +
                    "-" +
                    date.dataValues.month +
                    "-" +
                    date.dataValues.days,
                ],
              },
            },
          });
          console.log(leaves);
          console.log("in if");
          await attendence.update(
            {
              leaves: leaves[0].dataValues.NoOfLeaves,
            },
            {
              where: {
                employee_id: empdata.dataValues.employee_id,
                month_id : date.dataValues.month_id 
              },
            }
          );
        } else {
            console.log("in else");
          await attendence.create({
            employee_id: empdata.dataValues.employee_id,
            month_id: date.dataValues.month_id,
            leaves: 0,
          });
        }
      });
    });
    res.json(new ResponseModel("Table Data Added"));
  },
  viewAttendance: async (req, res) => {
    try {
      const result = await attendence.findAll({
        where: {
          employee_id: req.user.employee_id,
        },
        include : {
          model : workingDays,
          required : true
        }
      });
      res.json(new ResponseModel(result));
    } catch (err) {
      res.json(null, null, ["no data found"]);
    }
  },
  viewAllAttendanceget: async (req, res, next) => {
    try {
      const result = await attendence.findAll({
        include: [{
          model: employee,
          required: true,
        },
      {
        model : workingDays,
        required : true
      }],
      });
      res.json(new ResponseModel(result));
    } catch (err) { res.json(new ResponseModel(null,null,["No data found"]))}
  },
  viewAllAttendancepost: async (req, res, next) => {
    const { month, year } = req.body;
    try {
      const result = await attendence.findAll({
        include: {
          model: workingDays,
          required: true,
          where: {
            month: month,
            year: year,
          },
        },
      });
      res.json(new ResponseModel(result));
    } catch (err) {
      res.json(new ResponseModel(null, null, ["No data found"]));
    }
  },
  // attendenceUpdate : async(req, res, next)=>{
  //     try{

  //     }
  // }
};
