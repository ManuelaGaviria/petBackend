const express = require('express');
const router = express.Router();
const { listar, agregar, editar, eliminar } = require('../controllers/mascotas-controller');

router.get('/listar', listar);
router.post('/agregar', agregar);
router.put('/editar', editar);
router.delete('/eliminar', eliminar);


module.exports = router;