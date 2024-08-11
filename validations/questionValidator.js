const Joi = require('joi');

const questionSchema = {
  body: Joi.object({
    content: Joi.string().required(),
    // assignedTo: Joi.string().required(),
    isAnswered: Joi.boolean(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    // participantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
})
}

const askQuestionSchema = {
  body: Joi.object({
    content: Joi.string().required(),
    isAnonymous: Joi.boolean(),
    displayName: Joi.string().allow(null, '').optional(),  // Allow null or empty string
    // assignedTo: Joi.string(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    // participantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
})
}
  
const updateQuestionSchema = {
  body: Joi.object({
    content: Joi.string(),
    assignedTo: Joi.string(),
    isAnswered: Joi.boolean()
  })
}
module.exports = {
    questionSchema,
    askQuestionSchema,
    updateQuestionSchema
}