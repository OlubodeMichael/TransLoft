const mongoose = require('mongoose');

const trackingUpdateSchema = new mongoose.Schema({
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: '',
    }
  });

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
        enum: ['pending', 'accepted', 'in-transit', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now  // ✅ Removed the parentheses to prevent incorrect timestamp generation
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'shipment must belong to a user']
    },
    carrier: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        default: null
    },
    cargoDetails: {
        weight: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        dimensions: {
          type: String,
          required: true,
        }
      },
      tracking: {
        currentLocation: {
          type: String,
          default: '',
        },
        updates: [trackingUpdateSchema]
      }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
