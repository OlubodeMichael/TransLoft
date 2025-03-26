const express = require('express');
const shipmentController = require('../controllers/shipmentController')
const authController = require('./../controllers/authController')

const router = express.Router();


router
    .route('/')
    .get(authController.protect, shipmentController.getAllShipment)
    .post(authController.protect, shipmentController.createShipment);

router
    .route('/:id')
    .get(authController.protect, shipmentController.getShipment)
    .patch(authController.protect, shipmentController.updateShipment)
    .delete(authController.protect, authController.restrictedTo('admin'), shipmentController.deleteShipment);

module.exports = router