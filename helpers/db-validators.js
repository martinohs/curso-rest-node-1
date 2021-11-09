const { model } = require('mongoose');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta en BD`);
    }
};

// Verificar que el correo exista
const existeEmail = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El Correo ${correo} ya esta en uso`);
    }

};

const existeUsuario = async(id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
};



module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuario
};