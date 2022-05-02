const jwt = require('jsonwebtoken')

const refreshToken = (req,res,next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ err: "No token found" })
    }

    const employee = jwt.verify(token, process.env.JWT_SECRET)

    //clear token from cookie
    res.clearCookie(`${employee.id}`)
    req.cookies[`${employee.id}`] = ""

    //generate new token
    const newToken = jwt.sign({id: employee.id},process.env.JWT_SECRET,{
        expiresIn: "35s"
    })

    res.cookie("token",newToken,{
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 30)
    })

    req.id = employee.id

    next()
}

module.exports = refreshToken