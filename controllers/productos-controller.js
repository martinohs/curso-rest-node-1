const { response } = require("express");
const { Producto } = require('../models');







// obtenerCategorias - paginado - total - populate
const obtenerProductos = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const [productos, cant] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }) //tambien podria pasar la query en una variable ej query = {estado:true}
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(limite))
        .limit(Number(limite)),
    ]);

    res.json({
        cant,
        productos
    });
};

// obtenerCategria - objeto y populate
const obtenerProducto = async(req, res = response) => {

    const prodId = req.params.id;
    //tambien puede ser  const { id } = req.params;

    const producto = await Producto.findById(prodId)
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');

    res.json(producto);
};

const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    };

    const producto = new Producto(data);

    // Guardar DB

    await producto.save();

    res.status(201).json({
        producto
    });
};

// borrarCategoria -> cambiar estado:false
const borrarProducto = async(req, res = response) => {

    const prodId = req.params.id;
    const productoDB = await Producto.findByIdAndUpdate(prodId, { estado: false });
    productoDB.estado = false;
    res.status(201).json({
        msg: "Producto ELIMINADA CON EXITO",
        productoDB
    });


};
// actualizarProducto
const actualizarProducto = async(req, res = response) => {

    const prodId = req.params.id;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const productoDB = await Producto.findByIdAndUpdate(prodId, data);

    res.status(201).json({
        productoDB
    });

};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    borrarProducto,
    actualizarProducto
};