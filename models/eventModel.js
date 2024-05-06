const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start_date_time: {
    type: Date,
    required: true
  },
  end_date_time: {
    type: Date,
    required: true
  },
  access_code: {
    type: String,
    required: true,
    unique: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
