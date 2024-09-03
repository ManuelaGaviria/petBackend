const mascotasModel = require('../models/mascotas-model');

const listar = async (req, res) => {
    try {
        const lista = await mascotasModel.listar();
        res.send({ lista: lista, exito: true });
    } catch (error) {
        console.error(`Error al listar Mascotas: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al listar Mascotas" });
    }
}

const clienteActual = async (req, res) => {
    try {
        const id = req.body.id;
        const cedula = await mascotasModel.listaClienteActual(id);
        res.send({ cedula: cedula, exito: true });
    } catch (error) {
        console.error(`Error al listar Mascotas: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al listar el cliente actual de la mascota" });
    }
}

const agregar = async (req, res) => {
    try {
        const mascota = {
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            raza: req.body.raza,
            edad: req.body.edad,
            peso: req.body.peso,
            medicamento: req.body.medicamento,
            cliente: req.body.cliente
        }
        const exito = await mascotasModel.agregar(mascota);
        if (exito) {
            res.status(201).send({ exito: true }); // 201 significa "Created"
        } else {
            res.status(400).send({ exito: false, error: "No se pudo crear el medicamento" });
        }
    } catch (error) {
        console.error(`Error al agregar medicamento: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al agregar el medicamento" });
    }
}

const editar = async (req, res) => {
    try {
        const id = req.body.id;
        const mascota = {
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            raza: req.body.raza,
            edad: req.body.edad,
            peso: req.body.peso,
            medicamento: req.body.medicamento,
            cliente: req.body.cliente
        }
        const exito = await mascotasModel.editar(id, mascota);
        if (exito) {
            res.send({ exito: true });
        } else {
            res.status(404).send({ exito: false, error: "No se pudo editar el mascota" });
        }
    } catch (error) {
        console.error(`Error al editar mascota: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al editar el mascota" });
    }
}

const eliminar = async (req, res) => {
    try {
        const id = req.body.id;
        const exito = await mascotasModel.eliminar(id);
        if (exito) {
            res.send({ exito: true });
        } else {
            res.status(404).send({ exito: false, error: "La mascota no se encontró o no se pudo eliminar" }); // 404 significa "Not Found"
        }
    } catch (error) {
        console.error(`Error al eliminar mascota: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al eliminar la mascota" }); // 500 significa "Internal Server Error"
    }
}

module.exports = { 
    listar,
    clienteActual,
    agregar,
    editar,
    eliminar
}