const Question = require('../models/questionModel');
const Event = require('../models/eventModel');
const Participant = require('../models/participantModel');
const User = require('../models/userModel');

// We'll pass io as a parameter when we initialize the controller
module.exports = function(io) {
  return {
    askQuestion: async (req, res) => {
      const { content, eventId, isAnonymous, displayName } = req.body;

      try {
        // Verify the event exists
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        const question = new Question({
          content,
          eventId: event._id,
          isAnonymous,
          displayName
        });

        await question.save();

        console.log('New question:', question);

        // Emit the new question to all connected clients
        io.emit('new-question', question);

        res.status(201).json({ message: 'Question asked successfully', question });
      } catch (err) {
        console.error('Error in askQuestion:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
      }
    },

    getQuestions: async (req, res) => {
      try {
        const questions = await Question.find()
          .populate('eventId', 'name description')
          .populate('participantId', 'displayName');
        res.status(200).json(questions);
      } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: "Error fetching questions", error: err.message });
      }
    },

    getQuestionById: async (req, res) => {
      try {
        const question = await Question.findById(req.params.id)
          .populate('eventId', 'name description')
          .populate('participantId', 'displayName');
        if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
      } catch (err) {
        console.error('Error fetching question:', err);
        res.status(500).json({ message: "Error fetching question", error: err.message });
      }
    },

    updateQuestion: async (req, res) => {
      const { id } = req.params;
      const update = req.body;

      try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, update, { new: true });
        if (!updatedQuestion) {
          return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
      } catch (err) {
        console.error('Error updating question:', err);
        res.status(500).json({ message: "Error updating question", error: err.message });
      }
    },

    deleteQuestion: async (req, res) => {
      try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted successfully" });
      } catch (err) {
        console.error('Error deleting question:', err);
        res.status(500).json({ message: "Error deleting question", error: err.message });
      }
    }
  };
};