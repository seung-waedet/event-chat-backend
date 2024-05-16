const Event = require('../models/eventModel');
const Participant = require('../models/participantModel');
const User = require('../models/userModel');


// Create a new Event
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    const speakers = newEvent.speakers

    // Add speaker to participants list
    const participantPromises = speakers.map(async (speaker) => {
      const participant = new participantModel({
        eventId: newEvent._id,
        ...speaker
      });
      return participant.save();
    });

    await Promise.all(participantPromises);

    // Save the event
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event" });
  }
};



const joinEventRegistered = async (req, res) => {

  const { code, userId } = req.body;

  try {
    // Check if the event exists using the event code
    const event = await Event.findOne({ code: code });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is already a participant
    const existingParticipant = await Participant.findOne({ eventId: event._id, userId });
    if (existingParticipant) {
      return res.status(200).json({ message: 'User is already a participant', participant: existingParticipant });
    }

    // Save the user as a participant
    const participant = new Participant({
      eventId: event._id,
      userId,
    });

    await participant.save();

    res.status(201).json({ message: 'User added as participant', participant });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }

}

const joinEventUnregistered = async (req, res) => {

  const { code, displayName, isAnon } = req.body;

  try {
    // Check if the event exists using the event code
    const event = await Event.findOne({ code: code });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Save the unregistered user as a participant
    const participant = new Participant({
      type: 'attendee',
      isHost: false,
      isAnon,
      eventId: event._id,
      userId: null, // No userId for unregistered users
      displayName,
    });

    await participant.save();

    res.status(201).json({ message: 'Participant added', participant });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}




// Get all Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Get a single Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event" });
  }
};

// Update an Event by ID
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, update, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating event" });
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
    console.error(err);
    res.status(500).json({ message: "Error deleting event" });
  }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    joinEventRegistered,
    joinEventUnregistered
}
