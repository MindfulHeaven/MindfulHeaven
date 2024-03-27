const {Router}=require("express");
const controller = require("../Controllers/controllers");
const router=Router();

//Route handelling
router.post("/suggesttherapist",controller.suggest_therapist);

module.exports=router;