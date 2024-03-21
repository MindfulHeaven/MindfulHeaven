const {Router}=require("express");
const authController = require("../controllers/authControllers");
const router=Router();

//Route handelling
router.post("/signup",authController.signup_post)
router.post("/login",authController.login_post)
router.post("/logout",authController.logout_post)

module.exports=router