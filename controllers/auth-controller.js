const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    //Lo que me llega en el body de la request
    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });

        //* Controlo que el mail (es decir, el usuario) exista
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario-pwd no son correctos -correo'
            });
        }

        //* Controlo que el usuario no este borrado (inactivo)
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no esta activo'
            });
        }
        //* Verifica la contraseña, con bcryptjs comparo ambas contraseñas.
        const pwdValidator = bcryptjs.compareSync(password, usuario.password);
        if (!pwdValidator) {
            return res.status(400).json({
                msg: 'La contraseña es erronea'
            });
        }

        //*Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
            msg: 'Login ok'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error'
        });
    }

};

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Creo el usuario
            const data = {
                nombre,
                correo,
                password: 'xd',
                img,
                rol: 'USER_ROLE',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }
        // Si el usuario en BD
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            msg: 'Todo ok',
            id_token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token No se pudo verificar'
        });
    }
};


module.exports = {
    login,
    googleSignIn
};