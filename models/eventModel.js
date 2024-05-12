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
    type: boolean,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  code: {
  type: String,
  unique: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
