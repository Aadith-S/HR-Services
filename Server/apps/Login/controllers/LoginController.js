const db = require("../../../data/models");
const token = require("../../../utilities/tokenHandler");
const { ResponseModel } = require("../../../utilities/responseModel");
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
function generateOtp() {
  var digits = "0123456789";

  let tempOtp = "";

  for (let i = 0; i < 4; i++) {
    tempOtp += digits[Math.floor(Math.random() * 10)];
  }

  return tempOtp;
}

module.exports = {
  verifyLogin: (req, res, next) => {
    console.log(req.body);
    db.loginCredentials
      .findOne({
        where: { email: req.body.email},
        include: {
          model: db.roleInfo,
          required: true,
        },
      })
      .then((result) => {
        bcrypt.compare(req.body.password, result.dataValues.password, function(err, passResult) {
          if (passResult) {
            var tempObject = {
              role: result.dataValues.roleInfo.role_name,
              employee_id: result.dataValues.employee_id,
            };
            let otp = generateOtp();
            db.loginCredentials.update({
              otp : otp
            },{
              where : {
                login_id : result.dataValues.login_id
              }
            })
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
  
              port: 465,
  
              secure: true,
  
              service: "Gmail",
  
              auth: {
                user: "abishekkrtest@gmail.com",
  
                pass: "jrpgcbryfnxwgrfv",
              },
            });
  
            var mailOptions = {
              from: "abishekkrtest@gmail.com",
  
              to: "thanzeelaanez3@gmail.com"  ,
  
              subject: "my HR OTP",
  
              text: String(otp),
            };
  
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            console.log(tempObject);
            const tempToken = token.createToken(tempObject);
            res.json(new ResponseModel(tempToken));
          } 
          else{
            res.json(new ResponseModel(null, null, ["Incorrect password"]));
          }
      });
      })
      .catch((err) => {
        res.json(new ResponseModel(null, null, ["User not found"]));
      });
  },
  redirect: async(req, res) => {
    console.log(req.user.role);
    console.log(req.body);
    const user = await db.loginCredentials.findOne({
      where : {
        otp : req.body.otp
      }
    })
    if(user){
    if (req.user.role == "Employee") {
      res.send("/employee/dash");
    } else if (req.user.role == "Manager") {
      res.send("/manager/dash");
    } else {
      res.send("/hr/dash");
    }
  }
  },
};
