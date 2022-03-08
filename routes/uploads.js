const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads-controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeArchivo } = require('../middlewares/validar-archivo');

const router = Router();

router.post('/' ,existeArchivo ,cargarArchivo);

router.put('/:coleccion/:id',[
    existeArchivo,
    check('id','Tiene que ser mongoID').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios','productos'] ) ),
    validarCampos
],actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','Tiene que ser mongoID').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios','productos'] ) ),
    validarCampos
], mostrarImagen)


module.exports = router;