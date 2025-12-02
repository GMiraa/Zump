var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarValores", function (req, res) {
    dashboardController.buscarValores(req, res);
})

router.post("/cadastrarCliente", function (req, res) {
    dashboardController.cadastrarCliente(req, res);
})

router.get("/buscarClientes/:fkempresa", function (req, res) {
    dashboardController.buscarClientes(req, res);
})

router.post("/apagarCliente/:clienteId", function (req, res) {
    dashboardController.apagarCliente(req, res);
})

router.get("/pesquisarClientes/:nomeCliente", function (req, res) {
    dashboardController.pesquisarClientes(req, res);
})


module.exports = router;