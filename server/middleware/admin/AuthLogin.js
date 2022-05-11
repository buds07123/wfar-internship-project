const jwt = require('jsonwebtoken')

//middleware
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ err: "No token found" })
        }

        const admin = jwt.verify(token, process.env.JWT_SECRET)

        req.id = admin.id

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ err: "Unauthorized" })
    }
}

module.exports = auth