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

router.post("/atualizarCliente", function (req, res) {
    dashboardController.atualizarCliente(req, res);
})

router.get("/buscarConsultores/:fkempresa", function (req, res) {
    dashboardController.buscarConsultores(req, res);
})

router.post("/apagarConsultor/:consultorId", function (req, res) {
    dashboardController.apagarConsultor(req, res);
})

router.post("/cadastrarConsultor", function (req, res) {
    dashboardController.cadastrarConsultor(req, res);
})

router.get("/pesquisarConsultor/:nomeConsultor", function (req, res) {
    dashboardController.pesquisarConsultor(req, res);
})

module.exports = router;