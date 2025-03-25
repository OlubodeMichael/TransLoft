const express = require('express');
const shipmentController = require('../controllers/shipmentController')
const authController = require('./../controllers/authController')

const router = express.Router();


router
    .route('/')
    .get(authController.protect, authController.restrictedTo('admin'), shipmentController.getAllShipment)
    .post(shipmentController.createShipment);

router
    .route('/:id')
    .get(shipmentController.getShipment)
    .patch(shipmentController.updateShipment)
    .delete(authController.protect, authController.restrictedTo('admin'), shipmentController.deleteShipment);

module.exports = router