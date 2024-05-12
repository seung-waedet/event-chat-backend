const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
      type: String,
      required: True
    },
    assignedTo: {
      type: String,
      required: True
    },
    isAnswered: {
      type: Boolean,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: True
    },
    participant_id: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
      required: True
    }
  });

  module.exports = mongoose.model('question', questionSchema);
