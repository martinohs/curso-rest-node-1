const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    // Propiedades o variables se declaran en el constructor
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // this.categoriasPath = '/api/categorias';
        // Otra forma mas practica de hacerlo es tratar al path de la sig. manera:
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            categorias: '/api/categorias',
            uploads: '/api/uploads'

        };

        //* Conectar a base de datos
        this.conectarDB();

        //* Middlewares
        this.middlewares();

        //* Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    //* middlewares son funciones que siempre se va a ejecutar al iniciar el servidor
    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo de body (dato que entra en request, puede ser json, xml ,etc)
        this.app.use(express.json());

        //Directorio publico, el .use indica que es un middleware
        this.app.use(express.static('public'));

        // Note that this option available for versions 1.0.0 and newer EXPRESS-fileupload. 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }


    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server;