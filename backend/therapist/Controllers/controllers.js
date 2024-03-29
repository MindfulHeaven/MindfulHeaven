const Therapist = require("../models/therapist_model");
const Session = require("../models/session_model");

module.exports.suggest_therapist = async (req, res) => {
  try {
    const { category, type } = req.body;

    // Query therapist from the database based on user selection
    const therapists = await Therapist.find({ category, type });

    if (!therapists) {
      return res.status(404).json({ error: "Therapist not found" });
    }
    // console.log(therapists);
    // Return therapist name as the API response
    const response = therapists.map(therapist => ({
      therapistId: therapist._id,
      therapistName: therapist.name,
      therapistAddress: therapist.address,
      therapistNumber: therapist.number,
      therapistEmail: therapist.email,
      therapistRatings: therapist.ratings
    }));
    res.json(response);
  } catch (error) {
    console.error("Error suggesting therapist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    res.json(therapist);
  } catch (error) {
    console.error('Error fetching therapist details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.schedule_session = async (req, res) => {
  const { therapistId, startTime, endTime } = req.body;

  // Convert start and end times to Date objects for comparison
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Check for existing sessions that overlap with the proposed session
  const conflictingSession = await Session.findOne({
    therapistId,
    $or: [
      { startTime: { $lte: start, $gte: end } }, // Session starts within the proposed session
      { endTime: { $gte: start, $lte: end } }, // Session ends within the proposed session
      { startTime: { $lte: start }, endTime: { $gte: end } }, // Proposed session is within an existing session
    ],
  });

  if (conflictingSession) {
    return res.status(409).json({ error: 'The proposed session time conflicts with an existing session.' });
  }

  // If no conflicts, proceed to create the new session
  const newSession = new Session({ therapistId, startTime, endTime });
  await newSession.save();

  res.status(201).json(newSession);
};
