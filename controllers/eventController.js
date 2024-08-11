const Event = require('../models/eventModel');
const Participant = require('../models/participantModel');
const User = require('../models/userModel');

// Create a new Event
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    const participantPromises = newEvent.speakers.map(async (speaker) => {
      const participant = new Participant({
        eventId: newEvent._id,
        ...speaker
      });
      return participant.save();
    });

    await Promise.all(participantPromises);

    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Error creating event' });
  }
};

// Join event for registered users
const joinEventRegistered = async (req, res) => {
  const { code, userId } = req.body;

  try {
    const event = await Event.findOne({ code });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingParticipant = await Participant.findOne({ eventId: event._id, userId });
    if (existingParticipant) {
      return res.status(200).json({ message: 'User is already a participant', participant: existingParticipant });
    }

    const participant = new Participant({
      eventId: event._id,
      userId,
    });

    await participant.save();

    res.status(201).json({ message: 'User added as participant', participant });
  } catch (err) {
    console.error('Error joining event:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Join event for unregistered users
const joinEventUnregistered = async (req, res) => {
  const { code, displayName, isAnon } = req.body;

  try {
    // Check if the event exists using the event code
    const event = await Event.findOne({ code }).populate('speakers.userId', 'name');
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

    // Prepare the event data to return
    const eventData = {
      _id: event._id,
      name: event.name,
      description: event.description,
      isLive: event.isLive,
      code: event.code,
      speakers: event.speakers.map(speaker => ({
        type: speaker.type,
        isHost: speaker.isHost,
        userId: {
          _id: speaker.userId ? speaker.userId._id : null,
          name: speaker.userId ? speaker.userId.name : null
        }
      }))
    };

    // Return the event data
    return res.status(200).json({ event: eventData });
  } catch (error) {
    console.error('Error joining event:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get all Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('speakers.userId', 'name');
    res.status(200).json({ data: events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Get a single Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('speakers.userId', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ data: event });
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ message: 'Error fetching event' });
  }
};

// Update an Event by ID
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { speakers, ...otherUpdates } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (speakers) {
      event.speakers = [...event.speakers, ...speakers];
    }

    Object.assign(event, otherUpdates);
    await event.save();

    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Delete an Event by ID
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
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
};
