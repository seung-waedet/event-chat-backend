const express = require("express");
const questionRoute = express.Router();
const questionController = require("../controllers/questionController")

questionRoute.get("/questions", questionController.getQuestions)

questionRoute.get("/questions/:id", questionController.getQuestionById)

questionRoute.post("/questions", questionController.createQuestion)

questionRoute.patch("/questions/:id", questionController.updateQuestion)

questionRoute.delete("/questions/:id", questionController.deleteQuestion)

module.exports = questionRoute;
