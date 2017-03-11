const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
  route: Number,
  stop: String,
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  isRecurring: [Boolean],
  start_at: String,
  duration: Number, //minutes
}, { timestamps: true });


const Monitor = mongoose.model('Monitor', monitorSchema);

module.exports = Monitor;
