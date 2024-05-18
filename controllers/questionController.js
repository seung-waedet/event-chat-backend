const Question = require('../models/questionModel'); 
const Event = require('../models/eventModel');
const Participant = require('../models/participantModel');
const User = require('../models/userModel');


const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating question" });
  }
};





// Middleware to handle asking questions
const askQuestion = async (req, res) => {
  const { content, eventId, assignedTo, participantId } = req.body;

  try {
    // Verify the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Verify the participant is part of the event
    const participant = await Participant.findOne({ eventId: event._id, _id: participantId });
    if (!participant) {
      return res.status(403).json({ message: 'You are not part of this event' });
    }

       // If assignedTo is provided, verify the assigned speaker is part of the event
       if (assignedTo) {
        const speaker = await Participant.findOne({ eventId: event._id, userId: assignedTo, type: 'speaker' });
        if (!speaker) {
          return res.status(404).json({ message: 'Assigned speaker not found in this event' });
        }
      }

    // Create the question
    const question = new Question({
      content,
      assignedTo: assignedTo || null,
      eventId: event._id,
      participantId: participant._id
    });

    await question.save();

    res.status(201).json({ message: 'Question asked successfully', question });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};






// Get all Questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('eventId', 'name description') // Populates event details
      .populate('participantId', 'displayName'); // Populates user details (if available)
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching questions" });
  }
};

// Get a single Question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('eventId', 'name description') // Populates event details
      .populate('participantId', 'displayName'); // Populates participant details (if available)
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching question" });
  }
};

// Update a Question by ID
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, update, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(updatedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating question" });
  }
};

// Delete a Question by ID
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting question" });
  }
};

module.exports = {
    createQuestion,
    getQuestionById,
    getQuestions,
    deleteQuestion,
    updateQuestion,
    askQuestion
}
