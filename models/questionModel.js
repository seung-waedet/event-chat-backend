const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    assignedTo: {
      type: String,
      required: false
    },
    isAnswered: {
      type: Boolean,
      default: false
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    participantId: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
      required: true
    }
  });

  module.exports = mongoose.model('question', questionSchema);
