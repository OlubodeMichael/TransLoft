const Shipment = require("../models/shipment");
const AppError = require("../utils/appError");

exports.getAllShipment = async (req, res) => {
    try {
        let shipments ;
        if(req.user.role === "admin") {
            shipments = await Shipment.find().populate('user');
        } else {
            shipments = await Shipment.find({ user: req.user._id });
        }
        
        res.status(200).json({
            status: 'success',
            result: shipments.length,
            data: {
                shipments
            }
        })
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}

exports.createShipment = async (req, res) => {
    try {
        // Validate required fields
        const { pickUpLocation, destination, cargoDetails } = req.body;
        if (!pickUpLocation || !destination) {
            return res.status(400).json({
                status: 'fail',
                message: 'Pick up location and destination are required'
            });
        }

        const newShipment = await Shipment.create({
            pickUpLocation,
            destination,
            cargoDetails,
            user: req.user._id
          });
          

        res.status(200).json({
            status: 'success',
            data: {
                shipment: newShipment
            }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                status: 'fail',
                message: err.message
            });
        }
        res.status(500).json({
            status: 'error',
            message: 'Error creating shipment'
        });
    }
}

exports.getShipment = async (req, res, next) => {
    try {
        const shipment = await Shipment.findById(req.params.id)

        if(!shipment) {
            return next(new AppError("No shipment found with that ID", 404))
        }
        res.status(200).json({
            status: 'sucess',
            data: {
                shipment
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.updateShipment = async (req, res, next) => {
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body,  {
            new: true,
            runValidators: true
        })
        if(!shipment) {
            return next(new AppError("No shipment found with that ID", 404))
        }
        res.status(201).json({
            status: 'success',
            data: {
                shipment
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteShipment = async (req, res, next) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id)

        if(!shipment) {
            return next(new AppError("No shipment found with that ID", 404))
        }
        
        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}