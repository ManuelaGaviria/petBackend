const reporteModel = require('../models/reporte-model');
const xml = require('xml');

const generarReporteClientesYMedicamentos = async (req, res) => {
    try {
        const reporte = await reporteModel.generarReporteClientesYMedicamentos();
        res.send({exito:true, reporte:reporte})
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        return { exito: false, error: 'Error al generar el reporte' };
    }
}

const generarReporteClientesYMedicamentosXML = async (req, res) => {
    try {
        const reporte = await reporteModel.generarReporteClientesYMedicamentos();

        // Estructura del XML
        const xmlReporte = xml({
            reporte: reporte.map(cliente => ({
                cliente: [
                    { cedula: cliente.cedula },
                    { nombre: cliente.cliente },
                    { mascotas: cliente.mascotas.map(mascota => ({
                        mascota: [
                            { nombre: mascota.nombre },
                            { medicamento: mascota.medicamento },
                            { dosis: mascota.dosis }
                        ]
                    })) }
                ]
            }))
        });

        // Configuramos el Content-Type como XML
        res.set('Content-Type', 'application/xml');
        console.log(typeof(xmlReporte));
        console.log(xmlReporte);
        res.send({xmlReporte: xmlReporte});
    } catch (error) {
        console.error("Error al generar el reporte en XML:", error);
        res.status(500).send('Error al generar el reporte en XML');
    }
};

module.exports = { 
    generarReporteClientesYMedicamentos,
    generarReporteClientesYMedicamentosXML
}