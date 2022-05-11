const router = require('express').Router()
const controller = require('../controllers/controller')
const adminController = require('../controllers/adminController')

//middleware
const verifyToken = require('../middleware/AuthLogin')
const refreshToken = require('../middleware/refreshToken')

//admin middleware
const adminVerifyToken = require('../middleware/admin/AuthLogin')

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
// router.post('/postFullWfar', verifyToken, controller.postFullWfar)

router.post('/register', upload.fields([{name: "emp_picture"}, {name: "signature"}]) , controller.register)
router.post('/login', controller.login)
router.get('/getEmpInfo', verifyToken ,controller.getEmpInfo)  
router.put('/editProfilePic/:id', upload.single('emp_picture') ,controller.editProfilePic)
router.put('/editProfile/:id', controller.editProfile)
router.put('/changePassword/:id', controller.changePassword)
router.post('/postWfar', verifyToken, controller.postWfar )    
router.get('/findWeekNo/:weekNo', controller.findWeekNo)
router.get('/getWfarInfo/:schoolyear/:sem', verifyToken, controller.getWfarInfo)
router.get('/getFullWfarInfo/:id', controller.getFullWfarInfo)
router.put('/updateOneWfarInfo/:id', controller.updateOneWfarInfo)
router.put('/deleteOneWfar/:id/:rowID', controller.deleteOneWfar)
router.put('/wfarArchive/:id', controller.wfarArchive)
router.get('/getAllArchiveData', verifyToken, controller.getAllArchiveData)
router.put('/toRestore/:id', controller.toRestore)
router.post('/logout',controller.logout)      


//ADMIN
router.post('/adminReg', adminController.adminReg)
router.post('/adminLogin', adminController.adminLogin)
router.get('/getAdminInfo',adminVerifyToken, adminController.getAdminInfo)
router.put('/editAdminProfilePic/:id', upload.single('picture'), adminController.editAdminProfilePic)
router.put('/editAdminProfile/:id', adminController.editAdminProfile)
router.put('/adminChangePass/:id', adminController.adminChangePass)

router.get('/allAccReq', adminController.allAccReq)
router.put('/toReject/:id', adminController.toReject)
router.put('/toActive/:id' , adminController.toActive)
router.get('/verify_email/:id/:token', adminController.verify_email)

router.get('/getAllActiveUser', adminController.getAllActiveUser)
router.post('/toPromote/:id', adminController.toPromote)
router.put('/toDemote/:id', adminController.toDemote)

router.get('/getAllFaculty', adminController.getAllFaculty)
router.get('/getAllAC', adminController.getAllAC)
router.get('/getAllDH', adminController.getAllDH)
router.put('/editAssignTO/:id', adminController.editAssignTO)

router.get('/getAllWfar/:id', adminController.getAllWfar)
router.get('/getWfarsPerWeek/:id', adminController.getWfarsPerWeek)

router.post('/newBatch', adminController.newBatch)
router.get('/getAllBatch', adminController.getAllBatch)

router.post('/adminLogout', adminController.adminLogout)

module.exports = router
