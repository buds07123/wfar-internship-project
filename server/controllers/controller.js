const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const crypto = require('crypto')

//models
const employeeModel = require('../models/Employee')
const emailTokenModel = require('../models/EmailToken')
const wfarModel = require('../models/Wfar')

//upload picture
const cloudinary = require('../cloudinary/cloudinary')

//reqistration
exports.register = async (req,res) => { 
    try {
        //data
        const profilePic = await cloudinary.uploader.upload(req.files['emp_picture'][0].path) 
        const signaturePic = await cloudinary.uploader.upload(req.files['signature'][0].path)
        const {emp_number,fname,mname,lname,name_extension,course,position,username,email,password,passwordCheck} = req.body

        //checking username exists
        const existUsername = await employeeModel.findOne({ username: req.body.username });
        if (existUsername) {
            return res.status(406).json({
                err: "The username is taken. Try another."
            })
        }
        
        //checking email exists
        const existEmail = await employeeModel.findOne({ email: req.body.email });
        if (existEmail) {
            return res.status(406).json({
                err: "The email is taken. Try another."
            })
        }

        //password length
        if(password.length < 8){
            return res.status(406).json({
                err: "Password must atleast 8 characters"
            })
        }

        //checking pass and confirm pass
        if(password != passwordCheck){
            return res.status(406).json({
                err: "Password must be same for verification"
            })                                              
        }

        //hashing password 
        const hash = bcrypt.hashSync(password, 10)

        //schema
        const newEmployee = await new employeeModel({
            emp_picture: profilePic.secure_url,
            emp_number,
            fname,
            mname,
            lname,
            name_extension,
            course,
            signature: signaturePic.secure_url,
            position,
            username,
            email,
            password: hash
        }).save()
        
        const newToken = await new emailTokenModel({
            userId: newEmployee._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        //mail sender details
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        //mail receiver
        const mailOption = {
            from: ' "Verify your email" <nmaningo14@gmail.com>',
            to: newEmployee.email,
            subject: 'Please verify your email',
            html: `<h2> ${newEmployee.fname}! Thank you for registering to our site! </h2>
                    <h4> Please verify your email to continue...</h4?>
                    <a href="http://${req.headers.host}/api/verify_email/${newEmployee.id}/${newToken.token}">Verify your email</a>`
        }

        transporter.sendMail(mailOption, (error) => {
            if(error){
                console.log(error)
            }else{
                console.log('Verification email is sent to your email account')
            }
        })

        return res.json({msg: "Verification email is sent to your email account"})
        // return res.status(201).json({newEmployee})
    } catch (error) {
        console.log(error)
    }
}

//verify email
exports.verify_email = async (req, res) => {
    try {
        const emp_id = await employeeModel.findOne({ _id: req.params.id });
        if (!emp_id) return res.status(400).send("Invalid link");

        const token = await emailTokenModel.findOne({
            userId: emp_id._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");

        await employeeModel.findByIdAndUpdate( emp_id._id , {isVerified: true });
        await emailTokenModel.findByIdAndRemove(token._id);

        res.send("Email verified sucessfully");
    } catch (error) {
        res.status(400).send("An error occured");
        console.log(error)
    }
}

//login
exports.login = async (req,res,next) => {
    try {
        //get user data
        const { email, password } = req.body

        const employee = await employeeModel.findOne({email})

        if(!employee){
            return res.status(406).json({
                err: "The email or username is not existing"
            })
        }

        if(employee.isVerified == false){
            return res.status(406).json({
                err: "Verify your account first in your email account"
            })
        }

        //compare the password
        const isMatch = await bcrypt.compare(password,employee.password)

        if(!isMatch){
            return res.status(406).json({
                err: "invalid password"
            })
        }

        const token = jwt.sign({
            id: employee._id
        },process.env.JWT_SECRET,{
            expiresIn: "3d"
        })

        res.cookie("token",token,{
            httpOnly: true
        })
        
        return res.status(200).json({data: employee.id,token})
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
}

//getEmpInfoById
exports.getEmpInfo = async (req,res) => {
    const emp_id = req.id
    let emp;
    try {
        emp = await employeeModel.findById(emp_id)
    } catch (error) {
        return res.status(404).json({err: "Employee not found"})
    }

    if(!emp){
        return res.status(404).json({err: "Employee not found"})
    }
    return res.status(200).json({emp})
}

exports.postWfar = async (req,res) => {
    try {
        const emp_id = req.id
        const {week_number,date,subject,course,year,section,attendee,recording_link,activity,meet_screenshots,act_screenshots} = req.body
        
        //employee id
        id = await employeeModel.findById(emp_id)

        //save new wfar
        await new wfarModel({
            empId: id,
            week_number,
            date,
            subject,
            course,
            year,
            section,
            attendee,
            recording_link,
            activity,
            meet_screenshots,
            act_screenshots
        }).save()

        return res.status(200).json({msg: "Post Wfar Successfully"})
    } catch (error) {
        console.log(error)
    }
}

exports.getWfarInfo = async (req,res) => {
    const emp_id = req.id
    try {
        const empId = await wfarModel.find({empId: emp_id})

        return res.status(200).json({empId})
    } catch (error) {
        return res.status(404).json({err: "Employee id not found"})
    }
}

exports.getOneWfarInfo = async (req,res) => {
    try {
        const id = req.body
        const wfarId = await wfarModel.findById(id)

        return res.status(200).json({wfarId})
    } catch (error) {
        return res.status(404).json({err: "wfarId not found"})
    }
}

//logout
exports.logout = (req,res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ err: "No token found" })
        }

        // res.cookie(token, "", {
        //     httpOnly: true,
        //     expires: new Date(0)
        // })

        //cliearTokenFromCookie
        res.clearCookie('token')

        return res.status(200).json({ msg: "Successfully Log out" })
    } catch (error) {
        console.log(error)
    }
}