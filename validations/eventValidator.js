const Joi = require('joi');

const eventSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  isLive: Joi.string(), // Assuming isLive can be optional
  createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming createdBy is a valid ObjectId string
  code: Joi.string().alphanum().required() // Assuming code is required and must be alphanumeric
});

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
        'start_date_time',
        'end_date_time'
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
    validateUpdateEvent
  }
  
