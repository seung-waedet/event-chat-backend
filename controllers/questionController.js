const Question = require("../models/questionModel");
const Event = require("../models/eventModel");
const Participant = require("../models/participantModel");
const User = require("../models/userModel");

// We'll pass io as a parameter when we initialize the controller
module.exports = function (io) {
  return {
    askQuestion: async (req, res) => {
      const { content, eventId, isAnonymous, displayName } = req.body;

      try {
        // Validate required fields
        if (!content || content.trim().length === 0) {
          return res.status(400).json({ 
            message: "Question content is required" 
          });
        }

        if (content.length > 500) {
          return res.status(400).json({ 
            message: "Question must be 500 characters or less" 
          });
        }

        if (!eventId) {
          return res.status(400).json({ 
            message: "Event ID is required" 
          });
        }

        // Validate ObjectId format
        if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ 
            message: "Invalid event ID format" 
          });
        }

        if (!isAnonymous && (!displayName || displayName.trim().length === 0)) {
          return res.status(400).json({ 
            message: "Display name is required for non-anonymous questions" 
          });
        }

        // Verify the event exists
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ 
            message: "Event not found. Please refresh and try again." 
          });
        }

        const question = new Question({
          content: content.trim(),
          eventId: event._id,
          isAnonymous: isAnonymous || false,
          displayName: isAnonymous ? "Anonymous" : displayName?.trim(),
          isApproved: false,
        });

        await question.save();

        // Emit the new question to admins
        const room = io.sockets.adapter.rooms.get(eventId);
        if (room) {
          for (const id of room) {
            const socket = io.sockets.sockets.get(id);
            if (socket && socket.role === "admin") {
              socket.emit("new-question", question);
            }
          }
        }

        res.status(201).json({ 
          message: "Question submitted successfully! It will appear once approved.",
          question 
        });
      } catch (err) {
        console.error("Error in askQuestion:", err);
        
        if (err.name === 'CastError') {
          return res.status(400).json({ 
            message: "Invalid event ID format" 
          });
        }
        
        if (err.name === 'ValidationError') {
          return res.status(400).json({ 
            message: "Invalid question data. Please check your input and try again." 
          });
        }
        
        res.status(500).json({ 
          message: "Unable to submit question. Please try again later." 
        });
      }
    },

    upvoteQuestion: async (req, res) => {
      try {
        const questionId = req.params.id;
        const { uniqueId } = req.body;

        // Validate required fields
        if (!uniqueId) {
          return res.status(400).json({ 
            message: "Missing required field: uniqueId" 
          });
        }

        // Validate ObjectId format
        if (!questionId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ 
            message: "Invalid question ID format" 
          });
        }

        const question = await Question.findById(questionId);

        if (!question) {
          return res.status(404).json({ 
            message: "Question not found. It may have been deleted." 
          });
        }

        const upvotedIndex = question.upvotedBy.indexOf(uniqueId);
        let action = "";

        if (upvotedIndex === -1) {
          // Upvote
          question.upvotedBy.push(uniqueId);
          action = "upvoted";
        } else {
          // Remove upvote
          question.upvotedBy.splice(upvotedIndex, 1);
          action = "upvote removed";
        }

        await question.save();

        // Emit the updated question to all connected clients
        io.to(question.eventId.toString()).emit("updateQuestion", question);

        res.status(200).json({ 
          message: `Question ${action} successfully`, 
          question,
          upvotes: question.upvotedBy.length
        });
      } catch (err) {
        console.error("Error upvoting question:", err);
        
        if (err.name === 'CastError') {
          return res.status(400).json({ 
            message: "Invalid question ID format" 
          });
        }
        
        res.status(500).json({ 
          message: "Unable to process upvote. Please try again later." 
        });
      }
    },

    approveQuestion: async (req, res) => {
      try {
        const questionId = req.params.id;
        const question = await Question.findById(questionId);

        if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }

        question.isApproved = true;
        await question.save();

        // Emit the approved question to all connected clients
        io.to(question.eventId.toString()).emit("new-question", question);

        res
          .status(200)
          .json({ message: "Question approved successfully", question });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error approving question", error: err });
      }
    },

    markAsAnswered: async (req, res) => {
      try {
        const questionId = req.params.id;
        const question = await Question.findById(questionId);

        if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }

        question.isAnswered = true;
        await question.save();

        // Emit the updated question to all connected clients
        io.to(question.eventId.toString()).emit("updateQuestion", question);

        res
          .status(200)
          .json({ message: "Question marked as answered", question });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error marking question as answered", error: err });
      }
    },

    getQuestions: async (req, res) => {
      try {
        const { eventId } = req.query;
        const filter = eventId ? { eventId } : {};

        let questions;
        if (req.user && req.user.userType === "admin") {
          questions = await Question.find(filter)
            .populate("eventId", "name description")
            .populate("participantId", "displayName");
        } else {
          filter.isApproved = true;
          questions = await Question.find(filter)
            .populate("eventId", "name description")
            .populate("participantId", "displayName");
        }
        res.status(200).json(questions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        res
          .status(500)
          .json({ message: "Error fetching questions", error: err.message });
      }
    },

    getQuestionById: async (req, res) => {
      try {
        const question = await Question.findById(req.params.id)
          .populate("eventId", "name description")
          .populate("participantId", "displayName");
        if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
      } catch (err) {
        console.error("Error fetching question:", err);
        res
          .status(500)
          .json({ message: "Error fetching question", error: err.message });
      }
    },

    updateQuestion: async (req, res) => {
      const { id } = req.params;
      const update = req.body;

      try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, update, {
          new: true,
        });
        if (!updatedQuestion) {
          return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
      } catch (err) {
        console.error("Error updating question:", err);
        res
          .status(500)
          .json({ message: "Error updating question", error: err.message });
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
        console.error("Error deleting question:", err);
        res
          .status(500)
          .json({ message: "Error deleting question", error: err.message });
      }
    },
  };
};
