const { db } = require('../../db');

// Firestore
const firestore = db;

const coleccionMedicamentos = firestore.collection('Medicamentos');

let lista = [];

const listar = async () => {
    try {
        const consultaMedicamento = await coleccionMedicamentos.get();
        lista = consultaMedicamento.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        lista.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        return lista;
    } catch (error) {
        console.error(`Error al listar medicamentos: ${error}`);
        throw error;
    } 
}

const agregar = async (medicamento) => {
    try {
        const solicitudAgregar = await coleccionMedicamentos.add(medicamento);
        return true;
    } catch (error) {
        return false;
    }
}

const editar = async (id, medicamento) => {
    try {
        const medicamentoObjetivo = coleccionMedicamentos.doc(id);
        const docSnapshot = await medicamentoObjetivo.get();

        if (!docSnapshot.exists) {
            console.error(`El medicamento con ID ${id} no existe.`);
            return false;
        }
        await medicamentoObjetivo.update(medicamento);
        return true;
    } catch (error) {
        console.error(`Error al editar medicamento: ${error}`);
        throw error; 
    }
}

const eliminar = async (id) => {
    try {
        const medicamentoObjetivo = coleccionMedicamentos.doc(id);
        await medicamentoObjetivo.delete();
        return true;
    } catch (error) {
        console.error(`Error al eliminar medicamento: ${error}`);
        throw error; 
    }
}

module.exports = {
    listar,
    agregar,
    editar,
    eliminar
}