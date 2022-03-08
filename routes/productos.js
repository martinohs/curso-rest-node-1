const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth-controller');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos-controller');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const router = Router();

/*
 url/api/producto
*/

//Hacer un middleware para validar el ID
// existeproducto -> va en dbValidators parecido a existeUsuarioPorId

// Obtener todas los producto - Publico
router.get('/', obtenerProductos);

// Obtener un producto por id - Publico 
router.get('/:id', [
        check('id', 'No es un id de Mongo valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ],
    obtenerProducto);

// Crear producto - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'nombre ingresado no es valido').isString(),
    check('nombre', 'nombre ingresado no es valido').not().isEmpty(),
    check('categoria', 'ID de categoria no es de MONGO').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar producto - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    // check('id', 'Id del producto no es id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar producto - privado - un Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);





module.exports = router;