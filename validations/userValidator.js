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


const validateSignup = async (req, res, next) => {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const validateLogin = (req, res, next) => {
    try {
      const { error } = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }).validate(req.body);
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
    validateSignup,
    validateLogin,
    userSchema
}