const mongoose = require('mongoose');

const { Schema } = mongoose;
require('mongoose-currency').loadType(mongoose);

const { Currency } = mongoose.Types;

const Event = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Currency,
    required: false,
    default: 0,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: false,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', Event);
