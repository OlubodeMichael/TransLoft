const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    pickUpLocation: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true  // ✅ Fixed the typo here
    },
    status: {
        type: String,
        enum: ['pending', 'in-transit', 'delivered'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now  // ✅ Removed the parentheses to prevent incorrect timestamp generation
    }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
