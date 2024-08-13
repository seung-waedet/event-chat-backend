module.exports = function(io) {
    const express = require('express');
    const questionRoute = express.Router();
    const questionController = require("../controllers/questionController")(io)
    const {questionSchema, askQuestionSchema, updateQuestionSchema} = require("../validations/questionValidator")
    const { bearerTokenAuth, checkAdmin } = require("../middlewares/auth")
    const  validate  = require("../middlewares/validate")




    questionRoute.get("/questions", bearerTokenAuth, checkAdmin, questionController.getQuestions)

    questionRoute.get("/questions/:id", bearerTokenAuth, checkAdmin, questionController.getQuestionById)

    questionRoute.post("/upvote-question/:id", questionController.upvoteQuestion) 

    // questionRoute.post("/questions", validate(questionSchema), questionController.createQuestion)

    questionRoute.post("/ask-questions", validate(askQuestionSchema), questionController.askQuestion)

    questionRoute.patch("/questions/:id", validate(updateQuestionSchema), questionController.updateQuestion)

    questionRoute.delete("/questions/:id", questionController.deleteQuestion)

    return questionRoute
}