const { db } = require('../../db');

// Firestore
const firestore = db;

const coleccionUsuarios = firestore.collection('Usuarios');

let lista = [];

const listar = async () => {
    try {
        const consultaUser = await coleccionUsuarios.get();
        lista = consultaUser.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        lista.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        return lista;
    } catch (error) {
        console.error(`Error al listar usuarios: ${error}`);
        throw error;
    } 
}

const agregar = async (user) => {
    try {
        console.log("me vine aca");
        const solicitudAgregar = await coleccionUsuarios.add(user);
        console.log("llegue aca");
        return true;
    } catch (error) {
        console.log("pero me vine ppor aca");
        return false;
    }
}

const editar = async (id, user) => {
    try {
        const usuarioObjetivo = coleccionUsuarios.doc(id);
        const docSnapshot = await usuarioObjetivo.get();

        if (!docSnapshot.exists) {
            console.error(`El usuario con ID ${id} no existe.`);
            return false;
        }
        await usuarioObjetivo.update(user);
        return true;
    } catch (error) {
        console.error(`Error al editar usuario: ${error}`);
        throw error; 
    }
}

const eliminar = async (id) => {
    try {
        const usuarioObjetivo = coleccionUsuarios.doc(id);
        await usuarioObjetivo.delete();
        return true;
    } catch (error) {
        console.error(`Error al eliminar usuario: ${error}`);
        throw error; 
    }
}

module.exports = {
    listar,
    agregar,
    editar,
    eliminar
}