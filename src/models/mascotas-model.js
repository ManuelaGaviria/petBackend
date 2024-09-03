const { db } = require('../../db');

// Firestore
const firestore = db;

const coleccionMascotas = firestore.collection('Mascotas');

let lista = [];

const listar = async () => {
    try {
        const consultaMedicamento = await coleccionMascotas.get();
        lista = consultaMedicamento.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        lista.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        return lista;
    } catch (error) {
        console.error(`Error al listar mascotas: ${error}`);
        throw error;
    } 
}


const agregar = async (mascota) => {
    try {
        const solicitudAgregar = await coleccionMascotas.add(mascota);
        return true;
    } catch (error) {
        return false;
    }
}

const editar = async (id, mascota) => {
    try {
        const mascotaObjetivo = coleccionMascotas.doc(id);
        const docSnapshot = await mascotaObjetivo.get();

        if (!docSnapshot.exists) {
            console.error(`La mascota con ID ${id} no existe.`);
            return false;
        }
        await mascotaObjetivo.update(mascota);
        return true;
    } catch (error) {
        console.error(`Error al editar mascota: ${error}`);
        throw error; 
    }
}

const eliminar = async (id) => {
    try {
        const mascotaObjetivo = coleccionMascotas.doc(id);
        await mascotaObjetivo.delete();
        return true;
    } catch (error) {
        console.error(`Error al eliminar mascota: ${error}`);
        throw error; 
    }
}

module.exports = {
    listar,
    agregar,
    editar,
    eliminar
}