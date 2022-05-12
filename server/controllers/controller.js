const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//models
const employeeModel = require('../models/Employee')
const emailTokenModel = require('../models/EmailToken')
const wfarModel = require('../models/Wfar')
const fullwfarModel = require('../models/FullWfar')
const batchModel = require('../models/Admin/Batch')

//upload picture
const cloudinary = require('../cloudinary/cloudinary')
const { array } = require('../cloudinary/multer')

//reqistration
exports.register = async (req, res) => {
    try {
        //data
        const profilePic = await cloudinary.uploader.upload(req.files['emp_picture'][0].path)
        const signaturePic = await cloudinary.uploader.upload(req.files['signature'][0].path)
        const { emp_number, fname, mname, lname, name_extension, course, position, username, email, password, passwordCheck } = req.body

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
        if (password.length < 8) {
            return res.status(406).json({
                err: "Password must atleast 8 characters"
            })
        }

        //checking pass and confirm pass
        if (password != passwordCheck) {
            return res.status(406).json({
                err: "Password must be same for verification"
            })
        }

        //hashing password 
        const hash = bcrypt.hashSync(password, 10)

        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()

        const dateToday = dd + "/" + mm + "/" + yyyy

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
            dateOfRequest: dateToday,
            password: hash
        }).save()

        return res.json({ msg: "Registration Successful" })
    } catch (error) {
        console.log(error)
    }
}

//login
exports.login = async (req, res, next) => {
    try {
        //get user data
        const { email, password } = req.body

        const employee = await employeeModel.findOne({ email })

        if (!employee) {
            return res.status(406).json({
                err: "The email or username is not existing"
            })
        }

        if (employee.isVerified == false) {
            return res.status(406).json({
                err: "Verify your account first in your email account"
            })
        }

        //compare the password
        const isMatch = await bcrypt.compare(password, employee.password)

        if (!isMatch) {
            return res.status(406).json({
                err: "invalid password"
            })
        }

        const token = jwt.sign({
            id: employee._id
        }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })

        res.cookie("token", token, {
            httpOnly: true
        })

        return res.status(200).json({ data: employee.id, token })
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
}

//getEmpInfoById
exports.getEmpInfo = async (req, res) => {
    const emp_id = req.id
    let emp;
    try {
        emp = await employeeModel.findById(emp_id)
    } catch (error) {
        return res.status(404).json({ err: "Employee not found" })
    }

    if (!emp) {
        return res.status(404).json({ err: "Employee not found" })
    }
    return res.status(200).json({ emp })
}

exports.editProfilePic = async (req, res) => {
    try {
        const id = req.params.id
        const profilePic = await cloudinary.uploader.upload(req.file.path)

        await employeeModel.findByIdAndUpdate(id, {
            emp_picture: profilePic.secure_url
        })

        return res.status(200).json({ msg: "Picture Successfully Updated" })
    } catch (error) {
        console.log(error)
    }
}

exports.editProfile = async (req, res) => {
    try {
        const id = req.params.id
        const { emp_number, fname, mname, lname, name_extension, username, email } = req.body

        await employeeModel.findByIdAndUpdate(id, {
            emp_number,
            fname,
            mname,
            lname,
            name_extension,
            username,
            email
        })

        return res.status(200).json({ msg: "Successfully Updated" })
    } catch (error) {
        console.log(error)
    }
}

exports.changePassword = async (req, res) => {
    try {
        const id = req.params.id
        const { password, newPassword, passwordCheck } = req.body

        const emp = await employeeModel.findOne({ _id: id });

        //compare the password
        const isMatch = await bcrypt.compare(password, emp.password)

        if (isMatch) {
            // hashing password 
            const hash = bcrypt.hashSync(passwordCheck, 10)

            if (newPassword != passwordCheck) {
                return res.status(406).json({
                    err: "Password must be same for verification"
                })
            } else {
                await employeeModel.findByIdAndUpdate(id, {
                    password: hash
                })
            }
        } else {
            return res.status(406).json({
                err: "Invalid password."
            })
        }

        return res.status(200).json({ msg: "Password Successfully Updated" })
    } catch (error) {
        console.log(error)
    }
}


//upload multiple images
const cloudinaryImageUploadMethodMeet = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
        }
        )
    })
}

const cloudinaryImageUploadMethodAct = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
        }
        )
    })
}
  

//---------WFAR(FACULTY)
exports.postWfar = async (req, res) => {
    try {
        //wfar data
        const emp_id = req.id
        const { school_year, semester, comments } = req.body
        const { week_number, date, subject, course, year, section, attendee, recording_link, activity } = req.body

        //uploadmultiple images
        const urls = [];
        const files = req.files["meet_screenshots"];
        for (const file of files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethodMeet(path);
          urls.push(newPath);
        }

        //act_screenshots
        const actScreenshot_urls = [];
        const actScreenshot_urls_files = req.files["act_screenshots"];
        for (const file of actScreenshot_urls_files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethodAct(path);
          actScreenshot_urls.push(newPath);
        }

        //employee id
        const id = await employeeModel.findById(emp_id)

        //check if week number is existed
        const existWfar = await wfarModel.findOne({ empId: emp_id, week_number: req.body.week_number, semester: req.body.semester, school_year: req.body.school_year });
        if (existWfar) {
            const pushNewWfar = await wfarModel.updateOne({
                _id: existWfar._id
            }, {
                $push: {
                    "info": {
                        week_number,
                        date,
                        subject,
                        course,
                        year,
                        section,
                        attendee,
                        recording_link,
                        activity,
                        meet_screenshots: urls.map( url => url.res ),
                        act_screenshots: actScreenshot_urls.map( url => url.res )
                    }
                }
            })

            if (pushNewWfar) {
                const first = await wfarModel.findOne({
                    _id: existWfar._id
                },
                    {
                        info: {
                            $slice: 1
                        }
                    }
                )


                const last = await wfarModel.findOne({
                    _id: existWfar._id
                },
                    {
                        info: {
                            $slice: -1
                        }
                    }
                )

                // console.log()
                await wfarModel.findByIdAndUpdate(existWfar._id, { start_date: first.info[0].date, end_date: last.info[0].date })
            }
        } else {
            //save new wfar
            const newWfar = await new wfarModel({
                empId: id,
                school_year,
                semester,
                week_number,
                comments,
                info: [
                    {
                        week_number,
                        date,
                        subject,
                        course,
                        year,
                        section,
                        attendee,
                        recording_link,
                        activity,
                        meet_screenshots: urls.map( url => url.res ),
                        act_screenshots: actScreenshot_urls.map( url => url.res )
                    }
                ]
            }).save()

            if (newWfar) {
                const first = await wfarModel.findOne({
                    _id: newWfar._id
                },
                    {
                        info: {
                            $slice: 1
                        }
                    }
                )


                const last = await wfarModel.findOne({
                    _id: newWfar._id
                },
                    {
                        info: {
                            $slice: -1
                        }
                    }
                )

                await wfarModel.findByIdAndUpdate(newWfar._id, { start_date: first.info[0].date, end_date: last.info[0].date })
            }
        }

        return res.status(200).json({ msg: "Post Wfar Successfully" })
    } catch (error) {
        console.log(error)
    }
}

exports.findWeekNo = async (req,res) => {
    try {
        const weekNo = req.params.weekNo

        const weeks = await batchModel.find({school_year: weekNo})

        return res.status(200).json({ weeks })
    } catch (error) {
        console.log(error)
    }
}

exports.getWfarInfo = async (req, res) => {
    const emp_id = req.id
    const schoolyear = req.params.schoolyear
    const sem = req.params.sem
    try {
        const empId = await wfarModel.find({
            empId: emp_id,
            school_year: schoolyear,
            semester: sem,
            isActive: true
        })

        return res.status(200).json({ empId })
    } catch (error) {
        return res.status(404).json({ err: "Employee id not found" })
    }
}

exports.updateOneWfarInfo = async (req, res) => {
    try {
        const id = req.params.id
        const { week_number, date, subject, course, year, section, attendee, recording_link, activity, meet_screenshots, act_screenshots } = req.body

        const wfar = await wfarModel.findOneAndUpdate({ "info._id": id },
            {
                $set: {
                    'info.$.week_number': week_number,
                    'info.$.date': date,
                    'info.$.subject': subject,
                    'info.$.year': year,
                    'info.$.course': course,
                    'info.$.section': section,
                    'info.$.attendee': attendee,
                    'info.$.recording_link': recording_link,
                    'info.$.activity': activity,
                    'info.$.meet_screenshots': meet_screenshots,
                    'info.$.act_screenshots': act_screenshots
                }
            }
        )

        if (!wfar) {
            return res.status(404).json({ error: "Failed" })
        } else {
            const first = await wfarModel.findOne({
                "info._id": id
            },
                {
                    info: {
                        $slice: 1
                    }
                }
            )


            const last = await wfarModel.findOne({
                "info._id": id
            },
                {
                    info: {
                        $slice: -1
                    }
                }
            )

            await wfarModel.findOneAndUpdate({ "info._id": id }, { start_date: first.info[0].date, end_date: last.info[0].date })
        }

        return res.status(200).json({ msg: "Wfar Successfully Updated" })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ err: "wfarId not found" })
    }
}

exports.deleteOneWfar = async (req, res) => {
    try {
        const id = req.params.id
        const rowID = req.params.rowID
        const deleteWfar = await wfarModel.findOneAndUpdate(
            { _id: id },
            { $pull: { info: { _id: rowID } } },
            { new: true, multi: true }
        );

        if (deleteWfar) {
            const first = await wfarModel.findOne({
                _id: id
            },
                {
                    info: {
                        $slice: 1
                    }
                }
            )


            const last = await wfarModel.findOne({
                _id: id
            },
                {
                    info: {
                        $slice: -1
                    }
                }
            )

            await wfarModel.findOneAndUpdate({ _id: id }, { start_date: first.info[0].date, end_date: last.info[0].date })
        }

        return res.status(200).json({ msg: "Successfully deleted!" })
    } catch (error) {
        console.log(error)
    }
}

exports.postFullWfar = async (req, res) => {
    try {
        //wfar data
        const emp_id = req.id

        //employee id
        const id = await employeeModel.findById(emp_id)

        //full wfar data
        const { school_year, semester, week_number, start_date, end_date, status, comments } = req.body

        await new fullwfarModel({
            empId: id,
            school_year,
            semester,
            week_number,
            start_date,
            end_date,
            status,
            comments
        }).save()

        return res.status(200).json({ msg: "Post Full Wfar Successfully" })
    } catch (error) {
        console.log(error)
    }
}

exports.getFullWfarInfo = async (req, res) => {
    const wfar_id = req.params.id

    try {
        const wfarId = await wfarModel.find({ _id: wfar_id })

        return res.status(200).json({ wfarId })
    } catch (error) {
        return res.status(404).json({ err: "Wfar id not found" })
    }
}

//to archive
exports.wfarArchive = async (req, res) => {
    try {
        const id = req.params.id
        await wfarModel.findByIdAndUpdate(id, { isActive: false })

        return res.status(200).json({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error)
    }
}

//-----ARCHIVE table------
exports.getAllArchiveData = async (req, res) => {
    try {
        const empId = req.id

        const empData = await wfarModel.find({ empId: empId, isActive: false })

        return res.status(200).json({ empData })
    } catch (error) {
        console.log(error)
    }
}

exports.toRestore = async (req, res) => {
    try {
        const id = req.params.id
        await wfarModel.findByIdAndUpdate(id, { isActive: true })

        return res.status(200).json({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error)
    }
}


//Accont Request
exports.allReqAcc = async (req,res) => {
    try {
        const id = req.id
        const empData = await employeeModel.find( {_id:{$ne: id} })

        return res.status(200).json({empData})
    } catch (error) {
        console.log(error)
    }
}

//Handle Faculty
exports.handleFaculty = async (req,res) => {
    try {
        const id = req.id
        const empData = await employeeModel.find({_id: id});

        return res.status(200).json({empData})
    } catch (error) {
        console.log(error)
    }
}

//logout
exports.logout = (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ err: "No token found" })
        }

        res.clearCookie('token')

        return res.status(200).json({ msg: "Successfully Log out" })
    } catch (error) {
        console.log(error)
    }
}