const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth-controller');
const { crearCategoria, obtenerCategorias, obtenerCategoria, borrarCategoria, actualizarCategoria } = require('../controllers/categorias-controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const router = Router();

/*
 url/api/categorias
*/

//Hacer un middleware para validar el ID
// existeCategoria -> va en dbValidators parecido a existeUsuarioPorId

// Obtener todas las categorias - Publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - Publico 
router.get('/:id', [
        check('id', 'No es un id de Mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    obtenerCategoria);

// Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'nombre ingresado no es valido').isString(),
    check('nombre', 'nombre ingresado no es valido').not().isEmpty(),
    check('estado', 'tipo de estado invalido').isBoolean(),
    validarCampos
], crearCategoria);

// Actualizar categoria - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'nombre ingresado no es valido').isString(),
    check('nombre', 'nombre ingresado no es valido').not().isEmpty(),
    validarCampos
], actualizarCategoria);

// Borrar categoria - privado - un Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);





module.exports = router;