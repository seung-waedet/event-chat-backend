const express = require("express");
const questionRoute = express.Router();
const questionController = require("../controllers/questionController")
const {questionSchema, askQuestionSchema, updateQuestionSchema} = require("../validations/questionValidator")
const  validate  = require("../middlewares/validate")


questionRoute.post("/questions", validate(questionSchema), questionController.createQuestion)

questionRoute.post("/ask-questions", validate(askQuestionSchema), questionController.askQuestion)

questionRoute.patch("/questions/:id", validate(updateQuestionSchema), questionController.updateQuestion)

questionRoute.delete("/questions/:id", questionController.deleteQuestion)

module.exports = questionRoute;
