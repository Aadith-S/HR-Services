const db = require("../../../data/models");
const token = require("../../../utilities/tokenHandler");
const { ResponseModel } = require("../../../utilities/responseModel");

module.exports=
{
  verifyLogin : (req, res, next) => {
  console.log(req.body);
  db.loginCredentials
    .findOne({
      where: { email: req.body.email },
      include : {
        model : db.roleInfo,
        required : true
      }
    })
    .then((result) => {
      if (result.dataValues.password == req.body.password) {
        var tempObject = {
          role: result.dataValues.roleInfo.role_name,
          employee_id: result.dataValues.employee_id,
        };
        console.log(tempObject);
        const tempToken = token.createToken(tempObject);
        res.json(new ResponseModel(tempToken));
      } else if (result.dataValues.password != hrRegData.password) {
        res.json(new ResponseModel(null, null, ["Incorrect password"]));
      }
    })
    .catch((err) => {
      res.json(new ResponseModel(null, null, ["User not found"]));
    });
},
  redirect : (req, res) => {
    console.log(req.user.role);
    if(req.user.role == "Employee"){
      res.send("/employee/dash");
    }
    else if(req.user.role == "Manager"){
      res.send("/manager/dash")
    }
    else {
      res.send("/hr/dash")
    }
  }
};
