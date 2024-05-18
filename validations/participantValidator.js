const Joi = require('joi');

const participantSchema = {
  body: Joi.object({
    type: Joi.string().required(),
    displayName: Joi.string().required(),
    isHost: Joi.boolean().required(),
    isAnon: Joi.boolean().required(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional()
})
}

const editParticipantSchema = {
    body: Joi.object({
    type: Joi.string().optional(),
    displayName: Joi.string().optional(),
    isHost: Joi.boolean().optional(),
    isAnon: Joi.boolean().optional(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(), 
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional()
})
}




module.exports = {
    participantSchema,
    editParticipantSchema
}