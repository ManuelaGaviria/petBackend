const express = require('express');
const router = express.Router();
const { generarReporteClientesYMedicamentos } = require('../controllers/reporte-controller');

router.get('/generarReporteClientesYMedicamentos', generarReporteClientesYMedicamentos);


module.exports = router;