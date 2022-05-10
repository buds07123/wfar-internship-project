const router = require('express').Router()
const controller = require('../controllers/controller')

//middleware
const verifyToken = require('../middleware/AuthLogin')
const refreshToken = require('../middleware/refreshToken')

//uploadPhoto
const upload = require('../cloudinary/multer')

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../wfar-internship/public/uploads")
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({ storage: storage })

//ROUTES
// router.get('/refresh',refreshToken,verifyToken,controller.getEmpInfo)
router.post('/register', upload.fields([{name: "emp_picture"}, {name: "signature"}]) , controller.register)
router.get('/verify_email/:id/:token', controller.verify_email)
router.post('/login', controller.login)
router.get('/getEmpInfo', verifyToken ,controller.getEmpInfo)  
router.post('/postWfar', verifyToken, controller.postWfar )    
router.get('/getWfarInfo/:schoolyear/:sem', verifyToken, controller.getWfarInfo)
router.get('/getFullWfarInfo/:id', controller.getFullWfarInfo)
router.put('/updateOneWfarInfo/:id', controller.updateOneWfarInfo)
router.put('/deleteOneWfar/:id/:rowID', controller.deleteOneWfar)
router.put('/wfarArchive/:id', controller.wfarArchive)
router.get('/getAllArchiveData', verifyToken, controller.getAllArchiveData)
// router.post('/postFullWfar', verifyToken, controller.postFullWfar)
router.post('/logout',controller.logout)      

module.exports = router
