const Participant = require('../models/participantModel'); // Assuming your participant model is in models/participant.js

// Create a new participant
const createParticipant = async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating participant" });
  }
};

// Get all participants
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate('eventId', 'description'); // Populates event details
    res.status(200).json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching participants" });
  }
};

// Get a single participant by ID
const getParticipantById = async (req, res) => {
  try {
    const participantId = req.params.id;

    const participant = await Participant.findById(participantId).populate('eventId', 'description'); // Populates event details
    if (!participant) {
      return res.status(404).json({ message: "participant not found" });
    }
    res.status(200).json(participant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching participant" });
  }
};

// Update a participant by ID
const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(id, update, { new: true });
    if (!updatedParticipant) {
      return res.status(404).json({ message: "participant not found" });
    }
    res.status(200).json(updatedParticipant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating participant" });
  }
};

// Delete a participant by ID
const deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: "participant not found" });
    }
    res.status(200).json({ message: "participant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting participant" });
  }
};

module.exports = {
    createParticipant,
    getParticipants,
    getParticipantById,
    updateParticipant,
    deleteParticipant
}