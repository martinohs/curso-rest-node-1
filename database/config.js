const { clear } = require('google-auth-library/build/src/auth/envDetect');
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);
        console.clear();
        console.log('Base de datos esta online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en base de datos');
    }
};

module.exports = {
    dbConnection
};