const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");


//Aca coloco que colecciones estan permitidas 
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

//Tengo la response como parametro dado a que desde esta funcion podría salir y dar la respuesta directamente
const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino); //SI EN LA URL PASO UN ID DE MONGO = TRUE , SINO FALSE (ES EL NOMBRE)
    // const esMongoId = ObjectId.isValid(termino); //SI EN LA URL PASO UN ID DE MONGO = TRUE , SINO FALSE (ES EL NOMBRE)


    //Controlo si es un mongo ID busco el usuario
    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : ["No se encuentra id"]
        });
    }

    //Si es por nombre realizo una busqueda general
    //* Expresión regular que hace que sea insensible a las mayusculas y minusculas
    const regex = new RegExp(termino, 'i');

    //>> Es posible pasar mas de 1 dato por el find, por ejemplo aux = ['uno', 'dos', 'tres' ]
    //>> y hago Usuario.find({ nombre: aux}) me devolvera todos lso resultados q coincidadn con alguno de los 3

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    return res.json({
        results: (usuarios) ? [usuarios] : []
    });

};


const buscarCategorias = async(termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino); //SI EN LA URL PASO UN ID DE MONGO = TRUE , SINO FALSE (ES EL NOMBRE)



    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : ["No se encuentra id"]
        });
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        $and: [{ nombre: regex, estado: true }],
    });
    return res.json({
        results: (categorias) ? [categorias] : []
    });

};


const buscarProductos = async(termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino); //SI EN LA URL PASO UN ID DE MONGO = TRUE , SINO FALSE (ES EL NOMBRE)



    if (esMongoId) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : ["No se encuentra id"]
        });
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        $or: [{ nombre: regex }],
    });
    return res.json({
        results: (productos) ? [productos] : []
    });

};

const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({ msg: ' Coleccion incorrecta...' });

    }

    switch (coleccion) {

        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: ' Se olvido hacer esta busqueda'
            });

    }

};

module.exports = {
    buscar
}