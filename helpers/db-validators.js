const { model } = require('mongoose');
const { Categoria, Role, Usuario, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta en BD`);
    }
};

// Verificar que el correo exista
const existeEmail = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El Correo ${correo} ya esta en uso`);
    }

};

const existeUsuario = async (id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
};

const existeCategoriaPorId = async (id) => {
    const existeId = await Categoria.findById(id);
    if (!existeId) {
        throw new Error(`La categoria con id ${id} no existe`);
    }
};

const existeProductoPorId = async (id) => {
    const existeId = await Producto.findById(id);
    if (!existeId) {
        throw new Error(`El Producto con id ${id} no existe`);
    }
};

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes ( coleccion );
    if (!incluida){
        throw new Error(`La coleccion ${coleccion} no esta permitida, intente con ${colecciones}`);
    }
    return true;
};




module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuario,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
};