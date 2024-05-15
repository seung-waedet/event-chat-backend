const express = require("express");
const questionRoute = express.Router();
const questionController = require("../controllers/questionController")
const {validateAddQuestion, validateUpdateQuestion, questionSchema} = require("../validations/questionValidator")
const  validate  = require("../middlewares/validate")


questionRoute.post("/questions", validateAddQuestion, questionController.createQuestion)

questionRoute.patch("/questions/:id", validateUpdateQuestion, questionController.updateQuestion)

questionRoute.delete("/questions/:id", questionController.deleteQuestion)

module.exports = questionRoute;
