const Joi = require('joi');

const questionSchema = {
  body: Joi.object({
    content: Joi.string().required(),
    assignedTo: Joi.string().required(),
    isAnswered: Joi.boolean(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    participantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
})
}


  
module.exports = {
    questionSchema
}