const mongoose = require('mongoose');
const validator = require('validator');

const emailWaitListSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A user most enter a password'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
        
    }
})

const EmailWaitList = mongoose.model('EmailWaitList', emailWaitListSchema);

module.exports = EmailWaitList;