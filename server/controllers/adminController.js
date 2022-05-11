const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const crypto = require('crypto')

//upload picture
const cloudinary = require('../cloudinary/cloudinary')

//model
const adminModel = require('../models/Admin/Admin')
const employeeModel = require('../models/Employee')
const emailTokenModel = require('../models/EmailToken')
const wfarModel = require('../models/Wfar')
const batchModel = require('../models/Admin/Batch')

exports.adminReg = async (req,res) => {
    try {
        const {picture,first_name,middle_name,last_name,username,email,password,passwordCheck} = req.body

        //checking pass and confirm pass
        if(password != passwordCheck){
            return res.status(406).json({
                err: "Password must be same for verification"
            })                                              
        }

        //hashing password 
        const hash = bcrypt.hashSync(password, 10)

        const newAdmin = await new adminModel({
            picture,
            first_name,
            middle_name,
            last_name,
            username,
            email,
            password: hash
        }).save()

        return res.status(201).json({newAdmin})
    } catch (error) {
        console.log(error)   
    }
}

exports.adminLogin = async (req,res) => {
    try {
        const { username, password } = req.body

        const admin = await adminModel.findOne({username})

        if(!admin){
            return res.status(406).json({
                err: "The username is not existing"
            })
        }

        //compare the password
        const isMatch = await bcrypt.compare(password,admin.password)

        if(!isMatch){
            return res.status(406).json({
                err: "invalid password"
            })
        }

        const token = jwt.sign({
            id: admin._id
        },process.env.JWT_SECRET,{
            expiresIn: "3d"
        })

        res.cookie("token",token,{
            httpOnly: true
        })
        
        return res.status(200).json({data: admin.id,token})
    } catch (error) {
        console.log(error)
    }
}

exports.getAdminInfo = async (req,res) => {
    try {
        const admin_id = req.id
        const admin = await adminModel.findById(admin_id)

        if(!admin){
            return res.status(404).json({err: "Admin not found"})
        }
        return res.status(200).json({admin})
    } catch (error) {
        console.log(error)
    }
}

exports.editAdminProfilePic = async (req,res) => {
    try {
        const id = req.params.id
        const profilePic = await cloudinary.uploader.upload(req.file.path)

        await adminModel.findByIdAndUpdate(id, {
            picture: profilePic.secure_url
        })

        return res.status(200).json({msg: "Picture Successfully Updated"})
    } catch (error) {
        console.log(error)
    }
}

exports.editAdminProfile = async (req,res) => {
    try {
        const id = req.params.id
        const {first_name,middle_name,last_name,username,email} = req.body

        await adminModel.findByIdAndUpdate(id, {
            first_name,
            middle_name,
            last_name,
            username,
            email
        })

        return res.status(200).json({msg: "Successfully Updated"})
    } catch (error) {
        console.log(error)
    }
}

exports.adminChangePass = async (req,res) => {
    try {
        const id = req.params.id
        const {password,newPassword,passwordCheck} = req.body

        const admin = await adminModel.findOne({ _id: id });

        //compare the password
        const isMatch = await bcrypt.compare(password,admin.password)

        if(isMatch){
            // hashing password 
            const hash = bcrypt.hashSync(passwordCheck, 10)

            if(newPassword != passwordCheck){
                return res.status(406).json({
                    err: "Password must be same for verification"
                })   
            }else{
                await adminModel.findByIdAndUpdate(id, {
                    password: hash
                })
            }
        }else{
            return res.status(406).json({
                err: "Invalid password."
            })   
        }
        
        return res.status(200).json({msg: "Password Successfully Updated"})
    } catch (error) {
        console.log(error)
    }
}


//Account Request
exports.allAccReq = async (req,res) => {
    try {
        const empData = await employeeModel.find()

        return res.status(200).json({empData})
    } catch (error) {
        consolo.log(error)
    }
}

exports.toReject = async (req,res) => {
    try {
        const id = req.params.id
        await employeeModel.findByIdAndUpdate(id, { status: "Rejected", isVerified: false })

        return res.status(200).json({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error)
    }
}

exports.toActive = async (req,res) => {
    try {
        const id = req.params.id
        const newEmployee = await employeeModel.findByIdAndUpdate(id, { status: "Active" })

        if(newEmployee) {
            const newToken = await new emailTokenModel({
                userId: newEmployee._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()

            // mail sender details
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
                if (error) {
                    console.log(error)
                } else {
                    console.log('Verification email is sent to your email account')
                }
            })
        }

        return res.status(200).json({ msg: "Successfully updated" })
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

        await employeeModel.findByIdAndUpdate(emp_id._id, { isVerified: true });
        await emailTokenModel.findByIdAndRemove(token._id);

        res.send("Email verified sucessfully");
    } catch (error) {
        res.status(400).send("An error occured");
        console.log(error)
    }
}


//Promotion/Demotion
exports.getAllActiveUser = async (req,res) => {
    try {
        const empData = await employeeModel.find({status: "Active"})

        return res.status(200).json({empData})
    } catch (error) {
        console.log(error)
    }
}

exports.toPromote = async (req,res) => {
    try {
        const id = req.params.id
        const {updatedPosition} = req.body

        await employeeModel.findByIdAndUpdate(id,{
            updatedPosition
        })

        return res.status(200).json({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error)
    }
}

exports.toDemote = async (req,res) => {
    try {
        const id = req.params.id

        await employeeModel.findByIdAndUpdate(id,{
            updatedPosition: "Faculty"
        })

        return res.status(200).json({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error)
    }
}


//Faculty Assignment
exports.getAllFaculty = async (req,res) => {
    try {
        const empData = await employeeModel.find({updatedPosition: "Faculty"})

        return res.status(200).json({empData})
    } catch (error) {
        console.log(error)
    }
}

exports.getAllAC = async (req,res) => {
    try {
        const empData = await employeeModel.find({updatedPosition: "Area Chair"})

        return res.status(200).json({empData})
    } catch (error) {
        console.log(error)
    }
}

exports.getAllDH = async (req,res) => {
    try {
        const empData = await employeeModel.find({updatedPosition: "Department Head"})

        return res.status(200).json({empData})
    } catch (error) {
        console.log(error)
    }
}

exports.editAssignTO = async (req,res) => {
    try {
        const id = req.params.id
        const {ac_inCharge,dh_inCharge} = req.body

        await employeeModel.findByIdAndUpdate(id, {
            ac_inCharge,
            dh_inCharge
        })

        return res.status(200).json({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error)
    }
}

exports.newBatch = async (req,res) => {
    try {
        const {school_year,week_number} = req.body

        await new batchModel({
            school_year,
            week_number
        }).save()

        return res.status(200).json({ msg: "Successfully created." })
    } catch (error) {
        console.log(error)
    }
}

exports.getAllBatch = async (req,res) => {
    try {
        const batch = await batchModel.find().sort({school_year: 1})

        return res.status(200).json({batch})
    } catch (error) {
        console.log(error)
    }
}

exports.getAllWfar = async (req,res) => {
    try {
        const id = req.params.id

        const empWfar = await wfarModel.find({ empId: id, isActive: true })

        return res.status(200).json({ empWfar })
    } catch (error) {
        console.log(error)
    }
}

exports.getWfarsPerWeek = async (req,res) => {
    try {
        const wfar_id = req.params.id
        const wfar = await wfarModel.find({ _id: wfar_id })

        return res.status(200).json({ wfar })
    } catch (error) {
        return res.status(404).json({ err: "Wfar id not found" })
    }
}

exports.adminLogout = async (req,res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ err: "No token found" })
        }

        //cliearTokenFromCookie
        res.clearCookie('token')

        return res.status(200).json({ msg: "Successfully Log out" })
    } catch (error) {
        console.log(error)
    }
}