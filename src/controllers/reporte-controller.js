const reporteModel = require('../models/reporte-model');

const generarReporteClientesYMedicamentos = async (req, res) => {
    try {
        const reporte = await reporteModel.generarReporteClientesYMedicamentos();
        res.send({exito:true, reporte:reporte})
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        return { exito: false, error: 'Error al generar el reporte' };
    }
}

module.exports = { 
    generarReporteClientesYMedicamentos
}