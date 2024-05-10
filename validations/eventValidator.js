const Joi = require('joi');

const eventSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  description: Joi.string().min(3).trim().required(),
  start_date_time: Joi.date().required(),
  end_date_time: Joi.date().greater(Joi.ref('start_date_time')).required(), // Ensure end date is after start date

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
  
