const express = require('express');
const contactRoute = require('./contactRoute');
const commentRoute = require('./commentRoute ');
const router = express.Router();

router.use("/contact" , contactRoute)
router.use("/comment" , commentRoute)
module.exports = router;
