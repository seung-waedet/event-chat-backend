const Joi = require('joi');

const questionSchema = Joi.object({
  content: Joi.string().min(3).trim().required(),
  anonymous: Joi.boolean().required(),
});


const validateAddQuestion = (req, res, next) => {
    try {
      const { error } = questionSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const validateUpdateQuestion = (req, res, next) => {
    try {
      const { error } = questionSchema.validate(req.body);
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
    validateAddQuestion,
    validateUpdateQuestion
}