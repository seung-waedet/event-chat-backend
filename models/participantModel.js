const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
    type: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
    },
    isHost: {
      type: Boolean,
      default: true
    },
    isAnon: {
      type: Boolean,
      default: true
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  });

  module.exports = mongoose.model('Participant', participantSchema);
