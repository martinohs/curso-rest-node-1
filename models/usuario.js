const { Schema, model } = require('mongoose');


//* MODELO DE USUARIO
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function() {
    //Lo que hago es "sacar" la contraseña y la version del objeto usuario, con esto no muestro dicha informacion
    //sin embargo tanto la version como la contraseña siguen siendo parte del usuario
    const { __v, password, _id, ...unUsuario } = this.toObject();
    unUsuario.uid = _id;
    return unUsuario;
};


/* 
Creo un modelo de usuario para mi base de datos, es mi Entidad. Mongoose toma de aca la informacion.
MongoDB maneja los datos como objetos (no es como SQL), y a su vez estos estan en una coleccion llamada documentos

*/

module.exports = model('Usuario', UsuarioSchema);