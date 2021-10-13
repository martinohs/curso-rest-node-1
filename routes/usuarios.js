const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios-controller');

const router = Router();

// GET OBTIENE
router.get('/', usuariosGet);

// PUT ACTUALIZA 
router.put('/:id', usuariosPut);

// POST CREA
router.post('/', usuariosPost);

// DELETE BORRA
router.delete('/', usuariosDelete);

// DELETE BORRA
router.patch('/', usuariosPatch);


module.exports = router;