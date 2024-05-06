const Question = require('../models/questionModel'); 

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

// Get all Questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('event_id', 'name description') // Populates event details
      .populate('user_id', 'name'); // Populates user details (if available)
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
      .populate('event_id', 'name description') // Populates event details
      .populate('user_id', 'name'); // Populates user details (if available)
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
    updateQuestion
}
