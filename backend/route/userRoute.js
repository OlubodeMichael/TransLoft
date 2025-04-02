const express = require('express');
const userController = require("../controllers/userController");
const authController = require('./../controllers/authController')


const router = express.Router()

router.post('/signup', authController.signUp)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.patch('/updateMe', authController.protect,userController.updateMe);

router
   .route('/')
   .get(authController.protect, authController.restrictedTo('admin'), userController.getAllUsers)
   .post(userController.createUser);


router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;