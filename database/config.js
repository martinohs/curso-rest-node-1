const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos esta online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en base de datos');
    }
};

module.exports = {
    dbConnection
};