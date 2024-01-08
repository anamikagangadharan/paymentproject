


// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 name: String,
 email: String,
 phone: String,
 paymentId: String, // Assuming Razorpay payment ID
 // other fields...
});

module.exports = mongoose.model('User', UserSchema);