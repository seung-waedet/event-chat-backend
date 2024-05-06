const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    anonymous: {
      type: Boolean,
      required: true
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      optional: true
    }
  });

  module.exports = mongoose.model('question', questionSchema);
