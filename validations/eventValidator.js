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

const validateAddEvent = (req, res, next) => {
    try {
      const { error } = eventSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const validateUpdateEvent = async (req, res, next) => {
    try {

      // Modify the Joi schema to allow optional fields for update
      const updateSchema = eventSchema.clone().optionalKeys([
        'name',
        'description',
        'isLive'
    
      ]);
  
      const { error } = updateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  module.exports = {
    validateAddEvent,
    validateUpdateEvent,
    eventSchema
  }
  
