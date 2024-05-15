const Joi = require('joi');

const participantSchema = {
  body: Joi.object({
    type: Joi.string().required(),
    displayName: Joi.string().required(),
    isHost: Joi.boolean().required(),
    isAnon: Joi.boolean().required(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
})
}




module.exports = {
    participantSchema
}