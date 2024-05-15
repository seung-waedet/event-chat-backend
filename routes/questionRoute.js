const express = require("express");
const questionRoute = express.Router();
const questionController = require("../controllers/questionController")
const {questionSchema} = require("../validations/questionValidator")
const  validate  = require("../middlewares/validate")


questionRoute.post("/questions", validate(questionSchema), questionController.createQuestion)

questionRoute.patch("/questions/:id", validate(questionSchema), questionController.updateQuestion)

questionRoute.delete("/questions/:id", questionController.deleteQuestion)

module.exports = questionRoute;
