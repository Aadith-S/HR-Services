const {ResponseModel} = require('../utilities/responseModel');
const tokenHandler = require('../utilities/tokenHandler');
module.exports = (req, res, next) => {
    console.log("in middleware");
    if(req.url.startsWith('/api/login')){
        console.log("hlo");
        return next();
    }
    let token = req.headers['authorization'];
    token = token ? token.split(' ')[1] : null;
    console.log(token);
    console.log(tokenHandler.verifyToken(token));
    if(!token){
        return res.status(401).json(new ResponseModel(null,null,["Unauthorized No Token"]));
    }

    try{
        const tokenResult = tokenHandler.verifyToken(token);
        req.user = tokenResult;
        return next();
    }
    catch(err){
        return res.status(401).json(new ResponseModel(null,null,['Unauthorized wrong token']));
    }
}