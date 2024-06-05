const Therapist = require("../models/therapist_model");
const Session = require("../models/session_model");
const SessionBooking = require('../models/session_booking')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

module.exports.suggest_therapist = async (req, res) => {
  try {
    const { category, type } = req.body;

    // Query therapist from the database based on user selection
    const therapists = await Therapist.find({ category, type });

    if (!therapists) {
      return res.status(404).json({ error: "Therapist not found" });
    }
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
  try {
    const { userId, therapistId, startTime, endTime } = req.body;

    // Convert start and end times to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    const startHour = start.getHours();
    const endHour = end.getHours();
    const allowedStartHour = 9; // 9 AM
    const allowedEndHour = 18; // 6 PM

    if (startHour < allowedStartHour || startHour > allowedEndHour || endHour < allowedStartHour || endHour > allowedEndHour) {
      return res.status(400).json({ error: 'Sessions can only be booked between 9 AM and 6 PM.' });
    }

    const sessionBookings = await SessionBooking.find({ therapist: therapistId });

    const checks = sessionBookings.map(async (sessionBooking) => {
      const session = await Session.findById(sessionBooking.session);
      // Check if the proposed session time overlaps with the existing session time
      if (session?.startTime <= end && session?.endTime >= start) {
        throw new Error('The proposed session time conflicts with an existing session.');
      }
    });

    try {
      await Promise.all(checks);
    } catch (error) {
      // If any check throws an error, respond with the error message
      return res.status(409).json({ error: error.message });
    }

    const newSession = new Session({
      startTime: start,
      endTime: end,
    });
    await newSession.save();

    // If no conflicts, proceed to create the new session
    const newSessionBooking = new SessionBooking({
      user: userId,
      therapist: therapistId,
      session: newSession._id,
    });
    await newSessionBooking.save();
    res.status(201).json({ message: 'Session scheduled successfully', sessionBooking: newSessionBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scheduling the session.' });
  }
};

module.exports.therapistSessions = async (req, res) => {
  try {
    const { therapistId } = req.params;

    // Query the SessionBooking collection for all entries where the therapist matches the given therapistId
    const therapistSessions = await SessionBooking.find({ therapist: therapistId });

    const sessions = []
    const checks = therapistSessions.map(async (s) => {
      sessions.push(await Session.findById(s.session))
    })

    try {
      await Promise.all(checks);
    } catch (error) {
      return res.status(409).json({ error: error.message });
    }

    res.status(200).json({ bookingDetails: therapistSessions, sessionDetails: sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching therapist sessions.' });
  }
}

module.exports.userSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    // Query the SessionBooking collection for all entries where the user matches the given userId
    const userSessions = await SessionBooking.find({ user: userId });

    // const sessions = await Session.findById({userSessions.session})
    const sessions = []
    const checks = userSessions.map(async (s) => {
      sessions.push(await Session.findById(s.session))
    })

    try {
      await Promise.all(checks);
    } catch (error) {
      return res.status(409).json({ error: error.message });
    }

    res.status(200).json({ bookingDetails: userSessions, sessionDetails: sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user sessions.' });
  }
}
