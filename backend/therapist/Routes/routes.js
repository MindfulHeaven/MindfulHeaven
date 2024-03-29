const { Router } = require("express");
const controller = require("../Controllers/controllers");
const router = Router();

//Route handelling
router.get('/therapists/:id', controller.getTherapistById);
router.post("/suggesttherapist", controller.suggest_therapist);
router.post('/sessions', controller.schedule_session);

module.exports = router;