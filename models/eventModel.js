const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const speakerSchema = new Schema({
  type: String,
  isHost: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

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
  speakers: [speakerSchema]

});

module.exports = mongoose.model('Event', eventSchema);
