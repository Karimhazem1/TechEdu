const express = require('express');

const router = new express.Router();

const nodemailer = require('nodemailer');
const userModel = require('../models/userSchema');
const authenticate = require('../middleware/authenticate');


    const transporter = nodemailer.createTransport({
        tls: {
            rejectUnauthorized: false,
        },
        port: 587,
        secure: false,
        service: "gmail",
        auth: {
            user: process.env.APP_EMAIL_ADDRESS,
            pass: process.env.APP_EMAIL_PASSWORD
        }
    });

    router.post("/contactus",authenticate, async(req, res) => {
        const {fname,lname,email,mobile,message} =req.body;
        const token = jwt.sign({ _id: userfind._id }, secretyKey, { expiresIn: "1d" });

        const verifyToken = jwt.verify(token,secretyKey);

        if(!fname || !lname || !email || !mobile) {
            res.status(401).json({status:401,error:"All Input required"})
        }

        try {
            const preuser = await userModel.findOne({_id:req.userID});

            console.log(preuser)

            if(preuser) {
                const userMessage = await preuser.Messagesave(message)
                console.log(userMessage)
                const mailOptions = {
                    from: process.env.APP_EMAIL_ADDRESS,
                    to: email,
                    subject: "Sending email With Node.js",
                    html: "Your Response Has been Submitted"
                }
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log("Email Sent: " + info.response);
                    res.status(201).json({ status: 201, message:"Email Sent Successfully"});
                } catch(err) {
                    console.error("Error sending email:", err);
                    res.status(401).json({ status: 401, error: err.message });
                }
            } else {
                const finalUser = new userModel({
                    fname,lname,email,mobile,message
                });
                const storeData = await finalUser.save();
                const mailOptions = {
                    from: process.env.APP_EMAIL_ADDRESS,
                    to: email,
                    subject: "Sending email With Node.js",
                    html: "Your Response Has been Submitted"
                }
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log("Email Sent: " + info.response);
                    res.status(201).json({ status: 201, message:"Email Sent Successfully", storeData});
                } catch(err) {
                    console.error("Error sending email:", err);
                    res.status(401).json({ status: 401, error: err.message });
                }
            }
        } catch (err) {
            res.status(400).json({status:400, message:"All Input required"})
            console.log("catch error")
        }
    })


 


module.exports = router