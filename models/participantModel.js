const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
    type: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    isHost: {
      type: Boolean,
      required: true
    },
    isAnon: {
      type: Boolean,
      required: true
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
