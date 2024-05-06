const {Router}=require("express");
const authController = require("../controllers/authControllers");
const router=Router();

//Route handelling
router.post("/signup",authController.signup_post)
router.post("/login",authController.login_post)
router.post("/logout",authController.logout_post)
router.post("/update_depression_score",authController.update_depression_score)
router.post("/update_anxiety_score",authController.update_anxiety_score)
router.post("/update_stress_score",authController.update_stress_score)
router.get("/getDetails/:id",authController.get_details)

module.exports=router