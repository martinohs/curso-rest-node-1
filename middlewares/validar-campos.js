const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next(); // Se usa para validar que el midleware funciono, next indica que no hubo error y puede pasar al siguiente 
};

module.exports = { validarCampos };