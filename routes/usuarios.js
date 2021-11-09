const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios-controller');
const Role = require('../models/role');
const router = Router();
const { esRoleValido, existeEmail, existeUsuario } = require('../helpers/db-validators');

// GET OBTIENE
router.get('/', usuariosGet);

// PUT ACTUALIZA 
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

// POST CREA
//* con express-validator puedo controlar la informacion que se recibe antes de acceder a la url.
//* entonces el check prepara todos los errores que los midlewares devuelve y los carga en la request para que cuando llegamos a la funcion de usuariospost (en este caso)
//* pueda checkear que errores devolvio y hacer las validaciones correspondientes
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('password', 'la contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'El rol no es valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),

    //>> CONTROL DE ROLES
    //* check('rol').custom( (rol) => esRolValido(rol)) cuando el primer argumento es el mismo que estamos recibiendo, se puede obviar por lo cual queda:
    check('rol').custom(esRoleValido),
    check('correo').custom(existeEmail),

    validarCampos
], usuariosPost);



// DELETE BORRA
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
], usuariosDelete);

// DELETE BORRA
router.patch('/', usuariosPatch);


module.exports = router;