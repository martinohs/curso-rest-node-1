const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    usuario: {
        // Debe apuntar a la id del Objeto Usuario en nuestra base, que lo creo/edito
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

CategoriaSchema.methods.toJSON = function() {
    //Lo que hago es "sacar" la contraseña y la version del objeto usuario, con esto no muestro dicha informacion
    //sin embargo tanto la version como la contraseña siguen siendo parte del usuario
    const { __v, estado, ...data } = this.toObject();
    return data;
};
module.exports = model('Categoria', CategoriaSchema);