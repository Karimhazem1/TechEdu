const userModel= require("../models/userSchema")
const courseModel = require("../models/courseSchema")
const moment = require("moment");
const bcrypt = require("bcryptjs");
const secretyKey = process.env.KEY;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")




// email config 
const transporter = nodemailer.createTransport({
    tls: {
        rejectUnauthorized: false,
    },
    port: 587,
    secure: false,
    service:"gmail",
    auth:{
        user:process.env.APP_EMAIL_ADDRESS,
        pass:process.env.APP_EMAIL_PASSWORD
    }
})




// register user

const userRegister = async (req, res) => {
    // console.log(req.body)
    const {fname,email,mobile,password,cpassword} = req.body

    if(!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({error:"Fill the all data"});
        console.log("not data available");
    };

    try {
        const preuser = await userModel.findOne({email: email})
        if(preuser) {
            res.status(422).json({error:"This user already exists"})
        } else if(password!==cpassword) {
            res.status(422).json({error:"password and cpassword are not match"})
        } else {
            const finalUser = new userModel({
                fname,email,mobile,password,cpassword
            });

            const storedata = await finalUser.save()
            console.log(storedata)
    
            res.status(201).json(storedata)
        }
    } catch (error) {
        res.status(422).send(error);

    }
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Fill all the data" });
    }

    try {
        const userlogin = await userModel.findOne({ email: email });

        if (!userlogin) {
            return res.status(400).json({ error: "Invalid details" });
        }

        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid details" });
        }

        // Token generation
        const token = await userlogin.generateAuthToken();
        console.log("Generated Token:", token); 

        if (token) {
            res.cookie("TechEduCourses", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                domain: "localhost", 
                path: '/' 
            });
            console.log("Cookie Set:", token); 
            console.log("Set-Cookie Header:", res.get('Set-Cookie')); 
        } else {
            console.error("Token is empty");
        }

        res.status(201).json(userlogin);
    } catch (error) {
        res.status(400).json({ error: "Invalid details" });
    }
};


const addToCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await courseModel.findOne({ _id: id });

        const userAuthenticate = await userModel.findOne({ _id: req.userID });

        if (userAuthenticate) {
            await userAuthenticate.save();
            res.status(201).json(userAuthenticate);
        } else {
            res.status(401).json({ error: "Invalid User" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const addToFav = async (req, res) => {
    try {
        const { id } = req.params;
        const fav = await courseModel.findOne({ _id: id });

        const userAuthenticate = await userModel.findOne({ _id: req.userID });
        console.log(userAuthenticate);

        if (userAuthenticate) {
            await userAuthenticate.save();
            res.status(201).json(userAuthenticate);
        } else {
            res.status(401).json({ error: "Invalid User" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.userID; 
        const user = await userModel.findById(userId).populate('carts').populate('favouriates');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ carts: user.carts, favourites: user.favouriates,user });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ message: 'An error occurred while fetching cart data' });
    }
};

const getCartDetails =async (req, res) => {
    try {
        const buyuser = await userModel.findOne({_id:req.userID})
        res.status(201).json(buyuser)
    } catch(error) {
        console.log("error"+ error)
    }
}

const getFavDetails =async (req, res) => {
    try {
        const favuser = await userModel.findOne({_id:req.userID})
        res.status(201).json(favuser)
    } catch(error) {
        console.log("error"+ error)
    }
}

const validUser = async (req, res) => {
    try {
        const validuserone = await userModel.findOne({_id:req.userID})
        res.status(201).json(validuserone)
    } catch(error) {
        console.log("error"+ error)
    }
}


const removeFromCart = async (req, res) => {
    try {
        const {id} = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((course)=>{
            return course._id != id
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser)
        console.log("course remove")
    } catch(error) {
        console.log("error ", error)
        res.status(400).json(req.rootUser)
    }
}

const removeFromFav = async (req, res) => {
    try {
        const {id} = req.params;

        req.rootUser.favouriates = req.rootUser.favouriates.filter((course)=>{
            return course._id != id
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser)
        console.log("course remove")
    } catch(error) {
        console.log("error ", error)
        res.status(400).json(req.rootUser)
    }
}

const logoutUser = async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((cursor) => {
            return cursor.token !== req.token
        });
        res.clearCookie("TechEduCourses", {path: "/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout")
    } catch (error) {
        console.log("error for user Logout");
    }
}
//////////////////////////////

const sendPasswordLink = async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    if (!email) {
        return res.status(401).json({ status: 401, message: "Enter Your Email" });
    }
    try {
        const userfind = await userModel.findOne({ email: email });
        if (!userfind) {
            return res.status(401).json({ status: 401, message: "Invalid User" });
        }

        const token = jwt.sign({ _id: userfind._id }, secretyKey, { expiresIn: "1d" });

        const setusertoken = await userModel.findByIdAndUpdate(
            { _id: userfind._id },
            { verifytoken: token },
            { new: true }
        );

        if (setusertoken) {
            const mailOptions = {
                from: process.env.APP_EMAIL_ADDRESS,
                to: email,
                subject: "Send Email For Password Reset",
                text: `This Link Valid For 1 day http://localhost:5173/forgotpassword/${userfind._id}/${token}`
            };
            const info = await transporter.sendMail(mailOptions);
            console.log("Email Sent: " + info.response);
            return res.status(201).json({ status: 201, message: "Email Sent Successfully", info });
        }
    } catch (err) {
        console.log("Error ", err);
        return res.status(401).json({ status: 401, message: "Email not Sent" });
    }
};

const forgotPassword = async (req, res) => {

    const {id,token} = req.params;
    
    console.log("id,token",id,token)
    try {
        // _id:req.userID
        const validuser = await userModel.findOne({_id:req.userID});
        
        console.log("validuser",validuser)

        const verifyToken = jwt.verify(token,secretyKey);

        console.log("verifyToken",verifyToken)
        console.log("verifyToken._id",verifyToken._id)

        if(validuser&& verifyToken._id) {
            res.status(201).json({status:201,validuser})
        } else {
            res.status(401).json({status:401,message:"user not exist"})
        }
    }catch(error) {
        res.status(401).json({status:401,error})
    }

}


const changePassword = async(req,res)=>{
    const {id,token} = req.params;
    const {password} = req.body;

    try {
        const validuser = await userModel.findOne({_id:req.userID});
        const verifyToken = jwt.verify(token,secretyKey);

        if(validuser&&verifyToken._id) {
            const newpassword = await bcrypt.hash(password,12)

            const setnewuserpass = await userModel.findByIdAndUpdate({_id:req.userID},{password:newpassword})

            await setnewuserpass.save()
            
            res.status(201).json({status:201,setnewuserpass})

        }
        else {
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch(error) {
        res.status(401).json({status:401,error})
    }
}

module.exports = {
    userRegister,
    userLogin,
    addToCart,
    addToFav,
    getCart,
    getCartDetails,
    getFavDetails,
    validUser,
    removeFromCart,
    removeFromFav,
    logoutUser,
    forgotPassword,
    sendPasswordLink,
    changePassword,
}