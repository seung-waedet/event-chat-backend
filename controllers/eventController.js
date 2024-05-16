const Event = require('../models/eventModel');
const participantModel = require('../models/participantModel');



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
    deleteEvent
}
