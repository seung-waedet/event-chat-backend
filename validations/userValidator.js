const Joi = require('joi');

const userSchema = {
  body: Joi.object({
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    displayImage: Joi.string().uri().optional().allow(null),
    bio: Joi.string().required(),
    userType: Joi.string().valid('admin', 'speaker', 'attendee').required()
  })
}


const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

const userIdParamSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
});

const patchUserSchema = {
  body: Joi.object({
    displayName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    displayImage: Joi.string().uri().optional(),
    bio: Joi.string().optional(),
    userType: Joi.string().valid('admin', 'attendee', 'speaker').optional()
  }).min(1)
}
  
module.exports = {
    loginSchema,
    userSchema,
    patchUserSchema,
    userIdParamSchema
}