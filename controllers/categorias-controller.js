const { response } = require("express");
const { Categoria } = require('../models');
const usuario = require("../models/usuario");







// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {
    const { limite = 10 } = req.query;

    const [categorias, cant] = await Promise.all([
        Categoria.find({ estado: true })
        .populate('usuario', 'nombre')
        .limit(Number(limite)),
        Categoria.countDocuments({ estado: true })

    ]);

    res.json({
        cant,
        categorias
    });
};

// obtenerCategria - objeto y populate
const obtenerCategoria = async(req, res = response) => {

    const catId = req.params.id;

    const categoria = await Categoria.findById(catId)
        .populate('usuario', 'nombre');

    res.json(categoria);
};

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const { estado } = req.body;

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria,
        estado
    });
};

// borrarCategoria -> cambiar estado:false
const borrarCategoria = async(req, res = response) => {

    const catId = req.params.id;
    const categoriaDB = await Categoria.findByIdAndUpdate(catId, { estado: false });
    categoriaDB.estado = false;
    res.status(201).json({
        msg: "CATEGORIA ELIMINADA CON EXITO",
        categoriaDB
    });


};
// actualizarCategoria
const actualizarCategoria = async(req, res = response) => {

    const catId = req.params.id;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaDB = await Categoria.findByIdAndUpdate(catId, data);

    res.status(201).json({
        categoriaDB
    });

};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    borrarCategoria,
    actualizarCategoria
};