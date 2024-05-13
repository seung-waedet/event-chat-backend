const Joi = require('joi');

const participantSchema = Joi.object({
    type: Joi.string().required(),
    displayName: Joi.string().required(),
    isHost: Joi.boolean().required(),
    isAnon: Joi.boolean().required(),
    eventId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
});


const validateAddParticipant = async (req, res, next) => {
    try {
      const { error } = participantSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const validateUpdateParticipant = async (req, res, next) => {
  try {
    // Modify the Joi schema to allow optional fields for update
    const updateSchema = participantSchema.clone().optionalKeys(['name', 'bio']);

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
    validateAddParticipant,
    validateUpdateParticipant
}