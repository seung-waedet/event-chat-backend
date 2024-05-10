const Joi = require('joi');

const speakerSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  bio: Joi.string().optional().allow(''), // Allow empty string for optional bio
});


const validateAddSpeaker = async (req, res, next) => {
    try {
      const { error } = speakerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const validateUpdateSpeaker = async (req, res, next) => {
  try {
    // Modify the Joi schema to allow optional fields for update
    const updateSchema = speakerSchema.clone().optionalKeys(['name', 'bio']);

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
    validateAddSpeaker,
    validateUpdateSpeaker
}