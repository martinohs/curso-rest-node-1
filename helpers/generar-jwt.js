const jwt = require("jsonwebtoken");

const generarJWT = (uid = '') => {
    //Como jwt no puedo usar async tengo q manejarme con promesas
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el jsw');
            } else
                resolve(token);
        });

    });



};

module.exports = {
    generarJWT
};