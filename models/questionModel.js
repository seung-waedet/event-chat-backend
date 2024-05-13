const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    assignedTo: {
      type: String,
      required: true
    },
    isAnswered: {
      type: Boolean,
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
