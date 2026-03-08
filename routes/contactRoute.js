const express = require('express');
const contactController = require('../controller/contactControll');

const routerData = express.Router();

routerData.route("/")
.post( contactController.createData)
.get(contactController.getAllData)

routerData.route("/:id")
.delete(contactController.deletedData)

routerData.route("/status/:id").patch( contactController.updateStatus);

module.exports = routerData