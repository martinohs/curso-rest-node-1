const { response } = require('express');

const usuariosGet = (req, res = response) => {

    //* Con esto obtengo los parametros de una query que se pida por path : 
    // ejemplo -> //? /usuarios?q=hola&nombre=martino&apikey=1231231
    // const query = req.query;

    //tambien puedo desestructurarla y obtener lo que quiera:
    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'GET METHOD API - CONTROLLER',
        q,
        nombre,
        apikey
    });
};

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'PUT METHOD API - CONTROLLER',
        id
    });
};

const usuariosPost = (req, res = response) => {

    //* REQ.body es el contenido del request
    const { nombre, edad } = req.body; //Es muy comun desestructurar el request
    res.json({
        msg: 'POST METHOD API - CONTROLLER',
        nombre,
        edad
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE METHOD API - CONTROLLER'
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH METHOD API - CONTROLLER'
    });
};








module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
};