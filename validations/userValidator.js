const Joi = require('joi');

const userSchema = Joi.object({
  first_name: Joi.string().min(3).trim().optional(),
  last_name: Joi.string().min(3).trim().optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'io'] } }).optional().custom((value, helper) => {
    if (value && helper.state.userExists) {
      return helper.error('email already exists');
    }
    return value;
  }),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});


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
    validateLogin
}