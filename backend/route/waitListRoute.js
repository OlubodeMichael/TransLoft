const express = require('express');
const waitListController = require("../controllers/waitListController")

const router = express.Router()

router.route("/").post(waitListController.addToWaitList)



module.exports = router