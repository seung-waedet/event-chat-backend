const Joi = require('joi');

const eventSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    isLive: Joi.string(), 
    createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), 
    code: Joi.string().alphanum().required(),
    speakers: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('speaker').required(),
        isHost: Joi.boolean().required(),
        userId: Joi.string().required()
      })
    )
  })
}



  module.exports = {
    eventSchema
  }
  
