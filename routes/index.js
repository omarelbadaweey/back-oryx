const express = require('express');
const contactRoute = require('./contactRoute');
const commentRoute = require('./commentRoute ');
const deviceTokenRoute = require('./deviceTokenRoute');
const router = express.Router();

router.use("/contact" , contactRoute)
router.use("/comment" , commentRoute)
router.use("/device-token" , deviceTokenRoute)

module.exports = router;
