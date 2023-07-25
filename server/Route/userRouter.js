const router = require("express").Router()
const {signup , createUser ,login,forgotPassword,verifyPassword} = require("../controllers/userController")



router.post('/signup',  signup);
router.post('/createUser',  createUser);
router.post('/login',  login);
router.post('/forgot-password',forgotPassword);
// router.post('/change-password',changepassword);
router.post('/verify-password',verifyPassword);








module.exports = router