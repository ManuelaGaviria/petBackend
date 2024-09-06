const { db } = require('../../db');

// Firestore
const firestore = db;

const coleccionUsuarios = firestore.collection('Usuarios');
const coleccionMedicamentos = firestore.collection('Medicamentos');
const coleccionMascotas = firestore.collection('Mascotas');

let lista = [];

const listarClientes = async () => {
    try {
        const clientes = await coleccionUsuarios.get();
        const listaClientes = clientes.docs.map(doc => ({
            cedula: doc.data().cedula,
            nombre: doc.data().nombre,
            apellidos: doc.data().apellidos
        }));
        return { exito: true, lista: listaClientes };
    } catch (error) {
        console.error("Error al listar clientes:", error);
        return { exito: false, error: 'Error al listar clientes' };
    }
}

const listarMascotasPorCliente = async (cedulaCliente) => {
    try {
        const mascotasSnapshot = await coleccionMascotas.where('cliente', '==', cedulaCliente).get();
        const mascotas = mascotasSnapshot.docs.map(doc => ({
            identificacion: doc.data().identificacion,
            nombre: doc.data().nombre,
            medicamento: doc.data().medicamento,
        }));
        return { exito: true, lista: mascotas };
    } catch (error) {
        console.error(`Error al listar mascotas del cliente ${cedulaCliente}:`, error);
        return { exito: false, error: `Error al listar mascotas del cliente ${cedulaCliente}` };
    }
}

const obtenerMedicamentoPorNombre = async (nombreMedicamento) => {
    try {
        const medicamentosSnapshot = await coleccionMedicamentos.where('nombre', '==', nombreMedicamento).get();
        if (!medicamentosSnapshot.empty) {
            const medicamento = medicamentosSnapshot.docs[0].data();
            return { exito: true, medicamento: medicamento };
        } else {
            return { exito: false, error: 'Medicamento no encontrado' };
        }
    } catch (error) {
        console.error(`Error al obtener medicamento ${nombreMedicamento}:`, error);
        return { exito: false, error: `Error al obtener medicamento ${nombreMedicamento}` };
    }
}

async function generarReporteClientesYMedicamentos() {
    try {
        const respuestaClientes = await listarClientes();
        if (!respuestaClientes.exito) {
            return respuestaClientes;
        }

        const reporte = [];

        // Iterar sobre cada cliente y obtener las mascotas y medicamentos
        for (const cliente of respuestaClientes.lista) {
            const clienteReporte = {
                cliente: `${cliente.nombre} ${cliente.apellidos}`,
                cedula: cliente.cedula,
                mascotas: []
            };
            console.log("cliente reporte");
            console.log(clienteReporte);
            console.log("cliente cedula");
            console.log(cliente.cedula);
            const respuestaMascotas = await listarMascotasPorCliente(cliente.cedula);
            if (respuestaMascotas.exito) {
                console.log("vine aca");
                for (const mascota of respuestaMascotas.lista) {
                    const respuestaMedicamento = await obtenerMedicamentoPorNombre(mascota.medicamento);
                    if (respuestaMedicamento.exito) {
                        clienteReporte.mascotas.push({
                            nombre: mascota.nombre,
                            medicamento: mascota.medicamento,
                            dosis: respuestaMedicamento.medicamento.dosis
                        });
                    } else {
                        clienteReporte.mascotas.push({
                            nombre: mascota.nombre,
                            medicamento: mascota.medicamento,
                            dosis: 'No disponible'
                        });
                    }
                }
            }
            reporte.push(clienteReporte);
        }

        return reporte;
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        return { exito: false, error: 'Error al generar el reporte' };
    }
}


module.exports = { 
    listarClientes, 
    listarMascotasPorCliente, 
    obtenerMedicamentoPorNombre, 
    generarReporteClientesYMedicamentos
}