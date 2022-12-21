const { Op } = require("sequelize");
const { leaveReq, employee } = require("../../../data/models");
const { ResponseModel } = require("../../../utilities/responseModel");

module.exports = {
  addLeaveRequest: async (req, res) => {
    console.log("in leave");
    console.log(req.body);
    console.log("before");
    const { from, to, type, reason } = req.body;
    console.log(req.user.employee_id);
    try {
      const result = await leaveReq.create({
        from: from,
        to: to,
        type: type,
        reason: reason,
        employee_id: req.user.employee_id,
      });
      res.json(new ResponseModel(result));
    } catch (err) {
      res.json(
        new ResponseModel(null, null, ["Leave couldn't be created", err])
      );
    }
  },
  alleaveRequestsget: async (req, res) => {
    try {
      var result = await leaveReq.findAll();
    } catch (err) {
      res.json(new ResponseModel(null, null, ["Error Occured"]));
    }
    if (result.length == 0) {
      res.json(new ResponseModel(null, null, ["No data found"]));
    }
    res.json(new ResponseModel(result));
  },
  viewLeaveRequests: async (req, res) => {
    try {
      const result = await leaveReq.findAll({
        where: {
          employee_id: req.user.employee_id,
        },
      });
      res.json(new ResponseModel(result));
    } catch (err) {
      res.json(new ResponseModel(null, null, "no data found"));
    }
  },
  alleaveRequestspost: async (req, res) => {
    const { start, end } = req.body;
    try {
      var result = await leaveReq.findAll({
        where: {
          from: { [Op.between]: [start, end] },
        },
      });
      res.json(new ResponseModel(result));
    } catch (err) {
      res.json(new ResponseModel(null, null, ["No data found"]));
    }
  },
  leaveApprovalget: async (req, res) => {
    // try{
    // const result = await leaveReq.findAll({
    //     include : {
    //         model : employee,
    //         required : true
    //     },
    //     where : {
    //         [Op.or]:[{
    //             "$employee.superior1$" : req.user.employee_id
    //         },
    //         {
    //         [Op.and] : [{
    //             "$employee.superior2$" : req.user.employee_id
    //         },{
    //             approvalStatus : "A1"
    //         }]
    //         }
    //     ]
    //     }
    // });
    // res.json(new ResponseModel(result));
    const result1 = await leaveReq.findAll({
      include: {
        model: employee,
        required: true,
        where: {
          superior1: req.user.employee_id,
        },
      },
      where : {
        approvalStatus : {
            [Op.is] : null
          }
      }
    });
    const result2 = await leaveReq.findAll({
      include: {
        model: employee,
        required: true,
        where: {
          superior2: req.user.employee_id,
        },
      },
      where: {
        approvalStatus: "A1",
      },
    });
    const data = [result1, result2];
    res.json(new ResponseModel(data));
    // }
    // catch (err) {
    //     res.json(new ResponseModel(null,null,["Error Occured"]));
    // }
  },
  leaveApprovalpost: async (req, res) => {
    const { req_id, status } = req.body;
    console.log(req.body);
    try {
      await leaveReq.update(
        { approvalStatus: status },
        {
          where: {
            req_id: req_id,
          },
        }
      );
      res.json(new ResponseModel("ok"));
    } catch (err) {
      res.json(new ResponseModel(null,null,["Error Occured"]));
    }
  },
};
