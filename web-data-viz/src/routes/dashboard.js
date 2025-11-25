var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarValores", function (req, res) {
    dashboardController.buscarValores(req, res);
})

router.post("/cadastrarCliente", function (req, res) {
    dashboardController.cadastrarCliente(req, res);
})


module.exports = router;