const express = require('express');
const router = express.Router();
const { generarReporteClientesYMedicamentos, generarReporteClientesYMedicamentosXML } = require('../controllers/reporte-controller');

router.get('/generarReporteClientesYMedicamentos', generarReporteClientesYMedicamentos);
router.get('/generarReporteClientesYMedicamentosXML', generarReporteClientesYMedicamentosXML);


module.exports = router;