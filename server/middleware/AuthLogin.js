const jwt = require('jsonwebtoken')

//middleware
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ err: "No token found" })
        }

        const employee = jwt.verify(token, process.env.JWT_SECRET)

        req.id = employee.id

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ err: "Unauthorized" })
    }
}

module.exports = auth