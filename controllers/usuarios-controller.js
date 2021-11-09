const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async(req, res = response) => {

    //* Con esto obtengo los parametros de una query que se pida por path : 
    // ejemplo -> //? /usuarios?q=hola&nombre=martino&apikey=1231231
    // const query = req.query;

    //tambien puedo desestructurarla y obtener lo que quiera:
    // const { q, nombre, apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query; //Si no viene por defecto le asigno el valor 5

    //Para controlar que el parametro desde sea un numero, hecho a mano no en el curso. Uso otra variable porque cuando desestructuro es constante
    if (isNaN(desde)) {
        dsd = 4;
    } else {
        dsd = desde;
    }

    // const usuarios = await Usuario.find({ estado: true })
    // .limit(Number(limite))
    // .skip(Number(dsd));
    // const total = await Usuario.countDocuments({ estado: true });

    //! Con la promesa lo que logro es que se ejecuten ambas query al mismo tiempo, con esto ahorro tiempo a diferencia de que con los 2 async esperaba a que termine una para comenzar la otra (doble de tiempo)
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .limit(Number(limite))
        .skip(Number(dsd))
    ]);


    res.json({
        total,
        usuarios
    });
};

const usuariosPut = async(req, res = response) => {
    const id = req.params.id; //Es un parametro que va en la request por path
    const { _id, password, google, correo, ...resto } = req.body; //body de la request, desestructuro para excluir lo que no quiero que se modifique por defecto. 

    //TODO validar contra base de datos

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); //Cuantas "vuetlas" le quiero dar a la encriptacion, por defecto 10 pero puedo poner x (cuanto mas mejor)
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);



    res.json(usuario);
};

const usuariosPost = async(req, res = response) => {

    //* REQ.body es el contenido del request
    const { nombre, correo, password, rol } = req.body; //Es muy comun desestructurar el request
    const unUsuario = new Usuario({ nombre, correo, password, rol });



    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Cuantas "vuetlas" le quiero dar a la encriptacion, por defecto 10 pero puedo poner x (cuanto mas mejor)
    unUsuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await unUsuario.save();

    res.json({
        unUsuario
    });
};

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: `DELETE METHOD API - CONTROLLER ${id}`
    });

};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'PATCH METHOD API - CONTROLLER '
    });
};








module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
};