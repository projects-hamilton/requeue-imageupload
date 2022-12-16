const jwt = require("jsonwebtoken");
const JWTkey = process.env.TOKEN_KEY;
// const admin = require('../models/Admin')
// const User = require("../models/user");

module.exports.generateJwtToken = (user) => {
  return jwt.sign({ user }, JWTkey, {
    expiresIn: "7d",
  });
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.headers.authtoken) {
    console.log("entered authorization");
    const token = req.headers.authtoken;
    if (token == "")
      res.status(401).json({ message: "Authorization required" });
    const user = jwt.verify(token, JWTkey);
    if (!user) res.status(401).json({ message: "Authorization required" });
    req.user = user.user._id;
    // console.log( user,"effe");
   return next();
    
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }
};


module.exports.isCompany = (req, res, next) => {
  if(req.headers.Company_id){
    const token = req.headers.Company_id
    if (token == "")
    res.status(401).json({ message: "Company_Id required" });
    req.Company_id = token;
    return next();
  }
  else{
    return res.status(401).json({ message: "Authorization required" });
  }
}


