const express = require('express');
const cors = require('cors');

class Server {

    //Propiedades o variables se declaran en el constructor
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.middlewares();

        //* Rutas de mi aplicacion
        this.routes();
    }

    //* middlewares son funciones que siempre se va a ejecutar al iniciar el servidor
    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo de body (dato que entra en request, puede ser json, xml ,etc)
        this.app.use(express.json());

        //Directorio publico, el .use indica que es un middleware
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }


    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server;