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

const registeredUserSchema = {
    body: Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required(),
  })
}

const unregisteredUserSchema = {
  body: Joi.object({
    code: Joi.string().required(),
    displayName: Joi.string().required(),
    isAnon: Joi.boolean().required(),
  })
}

const speakerSchema = Joi.object({
  type: Joi.string().valid('speaker').required(),
  isHost: Joi.boolean().required(),
  userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
});

const editEventSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  isLive: Joi.boolean().optional(),
  createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
  code: Joi.string().optional(),
  speakers: Joi.array().items(speakerSchema).optional()
});


  module.exports = {
    eventSchema,
    registeredUserSchema,
    unregisteredUserSchema,
    editEventSchema
  }
  
