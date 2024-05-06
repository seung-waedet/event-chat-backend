const Speaker = require('../models/speakerModel'); // Assuming your Speaker model is in models/Speaker.js

// Create a new Speaker
const createSpeaker = async (req, res) => {
  try {
    const newSpeaker = new Speaker(req.body);
    await newSpeaker.save();
    res.status(201).json(newSpeaker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating speaker" });
  }
};

// Get all Speakers
const getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find().populate('event_id', 'name description'); // Populates event details
    res.status(200).json(speakers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching speakers" });
  }
};

// Get a single Speaker by ID
const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id).populate('event_id', 'name description'); // Populates event details
    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }
    res.status(200).json(speaker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching speaker" });
  }
};

// Update a Speaker by ID
const updateSpeaker = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedSpeaker = await Speaker.findByIdAndUpdate(id, update, { new: true });
    if (!updatedSpeaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }
    res.status(200).json(updatedSpeaker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating speaker" });
  }
};

// Delete a Speaker by ID
const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }
    res.status(200).json({ message: "Speaker deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting speaker" });
  }
};

module.exports = {
    createSpeaker,
    getSpeakers,
    getSpeakerById,
    updateSpeaker,
    deleteSpeaker
}