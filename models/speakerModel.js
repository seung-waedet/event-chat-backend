const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const speakerSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      optional: true
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    }
  });

  module.exports = mongoose.model('Speaker', speakerSchema);
