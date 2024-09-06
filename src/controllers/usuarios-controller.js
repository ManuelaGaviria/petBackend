const usuariosModel = require('../models/usuarios-model');

const listar = async (req, res) => {
    try {
        const lista = await usuariosModel.listar();
        res.send({ lista: lista, exito: true });
    } catch (error) {
        console.error(`Error al listar Usuarios: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al listar Usuarios" });
    }
}

const agregar = async (req, res) => {
    try {
        const user = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }
        const exito = await usuariosModel.agregar(user);
        if (exito) {
            res.status(201).send({ exito: true }); // 201 significa "Created"
        } else {
            res.status(400).send({ exito: false, error: "No se pudo crear el usuario" });
        }
    } catch (error) {
        console.error(`Error al agregar usuario: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al agregar el usuario" });
    }
}

const editar = async (req, res) => {
    try {
        const id = req.body.id;
        const user = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }
        const exito = await usuariosModel.editar(id, user);
        if (exito) {
            res.send({ exito: true });
        } else {
            res.status(404).send({ exito: false, error: "No se pudo editar el usuario" });
        }
    } catch (error) {
        console.error(`Error al editar usuario: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al editar el usuario" });
    }
}

const eliminar = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(id);
        const exito = await usuariosModel.eliminar(id);
        if (exito) {
            res.send({ exito: true });
        } else {
            res.status(404).send({ exito: false, error: "El usuario no se encontró o no se pudo eliminar" }); // 404 significa "Not Found"
        }
    } catch (error) {
        console.error(`Error al eliminar usuario: ${error}`);
        res.status(500).send({ error: "Ocurrió un error al eliminar el usuario" }); // 500 significa "Internal Server Error"
    }
}

module.exports = { 
    listar,
    agregar,
    editar,
    eliminar
}