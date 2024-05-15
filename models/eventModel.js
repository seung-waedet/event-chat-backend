const { boolean } = require('joi');
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
  isLive: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  code: {
  type: String,
  unique: true
  },
  speakers: [
    {
      type: { type: String, required: true },
      isHost: { type: Boolean, required: true },
      userId: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema);
