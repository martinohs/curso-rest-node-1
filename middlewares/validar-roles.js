const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin usuario'
        });
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Usuario no tiene permisos'
        });
    }

    next();
};

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar rol sin usuario'
            });
        }


        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `Se requiere uno de los siguientes roles : ${roles}`
            });

        }

        next();
    };

};

module.exports = {
    esAdminRole,
    tieneRol
};