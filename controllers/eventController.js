const Event = require("../models/eventModel");
const Participant = require("../models/participantModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const Question = require("../models/questionModel");
const QRCode = require("qrcode");

// Create a new Event
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    const participantPromises = newEvent.speakers.map(async (speaker) => {
      const participant = new Participant({
        eventId: newEvent._id,
        ...speaker,
      });
      return participant.save();
    });

    await Promise.all(participantPromises);

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Error creating event" });
  }
};

// Join event for registered users
const joinEventRegistered = async (req, res) => {
  const { code, userId } = req.body;

  try {
    // Validate required fields
    if (!code) {
      return res.status(400).json({ 
        message: "Event code is required" 
      });
    }

    if (!userId) {
      return res.status(400).json({ 
        message: "User ID is required" 
      });
    }

    // Validate ObjectId format for userId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        message: "Invalid user ID format" 
      });
    }

    const event = await Event.findOne({ access_code: code });
    if (!event) {
      return res.status(404).json({ 
        message: "Event not found. Please check your event code and try again." 
      });
    }

    // Check if user exists
    const User = require("../models/userModel");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found. Please log in again." 
      });
    }

    const existingParticipant = await Participant.findOne({
      eventId: event._id,
      userId,
    });
    
    if (existingParticipant) {
      return res.status(200).json({
        message: "You are already registered for this event",
        participant: existingParticipant,
        event
      });
    }

    const participant = new Participant({
      type: "attendee",
      isHost: false,
      eventId: event._id,
      userId,
      uniqueId: userId,
      displayName: user.name || user.email,
    });

    await participant.save();

    res.status(201).json({ 
      message: "Successfully joined the event!",
      participant,
      event
    });
  } catch (err) {
    console.error("Error joining event:", err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: "Invalid ID format provided" 
      });
    }
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid data provided. Please check your information and try again." 
      });
    }
    
    res.status(500).json({ 
      message: "Unable to join event. Please try again later." 
    });
  }
};

// Join event for unregistered users
const joinEventUnregistered = async (req, res) => {
  const { code, displayName, isAnon } = req.body;

  try {
    // Validate required fields
    if (!code) {
      return res.status(400).json({ 
        message: "Event code is required" 
      });
    }

    if (!displayName || displayName.trim().length === 0) {
      return res.status(400).json({ 
        message: "Display name is required" 
      });
    }

    if (displayName.length > 50) {
      return res.status(400).json({ 
        message: "Display name must be 50 characters or less" 
      });
    }

    // Check if the event exists using the event code
    const event = await Event.findOne({ access_code: code }).populate(
      "speakers.userId",
      "name",
    );
    
    if (!event) {
      return res.status(404).json({ 
        message: "Event not found. Please check your event code and try again." 
      });
    }

    // Check if event is active (optional - you can add date checks here)
    // const now = new Date();
    // if (event.end_date_time && new Date(event.end_date_time) < now) {
    //   return res.status(400).json({ 
    //     message: "This event has already ended." 
    //   });
    // }

    const uniqueId = uuidv4();
    
    // Save the unregistered user as a participant
    const participant = new Participant({
      type: "attendee",
      isHost: false,
      isAnon: isAnon || false,
      eventId: event._id,
      userId: null, // No userId for unregistered users
      displayName: displayName.trim(),
      uniqueId,
    });

    await participant.save();

    // Return the participant and event data
    return res.status(200).json({ 
      message: "Successfully joined the event!",
      participant, 
      event 
    });
  } catch (error) {
    console.error("Error joining event:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid data provided. Please check your information and try again." 
      });
    }
    
    return res.status(500).json({ 
      message: "Unable to join event. Please try again later." 
    });
  }
};

// Get all Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("speakers.userId");
    res.status(200).json({ data: events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Get a single Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "speakers.userId",
      "name",
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ data: event });
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ message: "Error fetching event" });
  }
};

// Update an Event by ID
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { speakers, ...otherUpdates } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (speakers) {
      event.speakers = [...event.speakers, ...speakers];
    }

    Object.assign(event, otherUpdates);
    await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (err) {
    console.error("Error updating event:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Delete an Event by ID
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getEventStats = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const participantCount = await Participant.countDocuments({ eventId: id });
    const questions = await Question.find({ eventId: id });

    const questionCount = questions.length;
    const answeredQuestionCount = questions.filter((q) => q.isAnswered).length;
    const totalUpvotes = questions.reduce((acc, q) => acc + q.upvotes, 0);

    const questionTimeline = questions.map((q) => ({
      content: q.content,
      createdAt: q.createdAt,
    }));

    res.status(200).json({
      participantCount,
      questionCount,
      answeredQuestionCount,
      totalUpvotes,
      questionTimeline,
    });
  } catch (err) {
    console.error("Error fetching event stats:", err);
    res.status(500).json({ message: "Error fetching event stats" });
  }
};

const generateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const joinURL = `http://localhost:3000/join?code=${event.access_code}`;
    const qrCodeImage = await QRCode.toDataURL(joinURL);

    res.status(200).send(`<img src="${qrCodeImage}">`);
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).json({ message: "Error generating QR code" });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEventRegistered,
  joinEventUnregistered,
  getEventStats,
  generateQRCode,
};
