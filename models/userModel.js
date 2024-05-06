const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    first_name: {
      type: String,
      optional: true
    },
    last_name: {
        type: String,
        optional: true
      },
    email: {
      type: String,
      optional: true,
      unique: true // Optional for unique email validation
    }
  });

module.exports = mongoose.model('User', userSchema);
