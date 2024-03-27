const Therapist = require("../models/therapist_model");

module.exports.suggest_therapist = async (req, res) => {
  try {
    const { category, type } = req.body;

    // Query therapist from the database based on user selection
    const therapist = await Therapist.findOne({ category, type });

    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Return therapist name as the API response
    res.json({
      therapistName: therapist.name,
      therapistAddress: therapist.address,
      therapistNumber: therapist.number,
    });
  } catch (error) {
    console.error("Error suggesting therapist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
