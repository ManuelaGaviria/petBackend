const medicamentosModel = require('../models/medicamentos-model');

const listar = async (req, res) => {
    try {
        const lista = await medicamentosModel.listar();
        res.send({ lista: lista, exito: true });
    } catch (error) {
        console.error(`Error al listar Medicamentos: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al listar Medicamentos" });
    }
}

const agregar = async (req, res) => {
    try {
        const medicamento = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            dosis: req.body.dosis
        }
        const exito = await medicamentosModel.agregar(medicamento);
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
        const medicamento = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            dosis: req.body.dosis
        }
        const exito = await medicamentosModel.editar(id, medicamento);
        if (exito) {
            res.send({ exito: true });
        } else {
            res.status(404).send({ exito: false, error: "No se pudo editar el medicamento" });
        }
    } catch (error) {
        console.error(`Error al editar medicamento: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al editar el medicamento" });
    }
}

const eliminar = async (req, res) => {
    try {
        const id = req.body.id;
        const exito = await medicamentosModel.eliminar(id);
        if (exito) {
            res.send({ exito: true });
        } else {
            res.status(404).send({ exito: false, error: "El medicamento no se encontró o no se pudo eliminar" }); // 404 significa "Not Found"
        }
    } catch (error) {
        console.error(`Error al eliminar medicamento: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al eliminar el medicamento" }); // 500 significa "Internal Server Error"
    }
}

module.exports = { 
    listar,
    agregar,
    editar,
    eliminar
}