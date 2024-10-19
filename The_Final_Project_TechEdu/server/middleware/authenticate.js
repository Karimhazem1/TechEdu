const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const secretyKey = process.env.KEY;

const authenticate = async (req, res, next) => {
    console.log("Cookies:", req.cookies); 
    console.log("Set-Cookie Header:", res.get('Set-Cookie')); 

  const token = req.cookies.TechEduCourses;
  console.log("Token:", token); 
  console.log("Secret Key:", secretyKey);
  if (!token) {
      return res.status(401).send({ error: 'Authentication token missing' });
    }
    
    try {
    console.log("Token:", token); 
    console.log("Secret Key:", secretyKey);  
    const verifyToken = jwt.verify(token, secretyKey);
    console.log("Verified Token:", verifyToken); 

    const rootUser = await userModel.findOne({ _id: verifyToken._id, "tokens.token": token });
    console.log("Root User:", rootUser); 
    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No Token Provided");
    console.log("Error:", error); 
  }
};


module.exports = authenticate;
