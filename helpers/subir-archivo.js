const path = require('path');
const {v4 : uuidv4 } = require('uuid');

const subirArchivo = (files, extencionesValidas = ['png','jpg','jpng','gif'], carpeta = '') => {
    
    return new Promise ((resolve, reject) => {
        
        //Obtengo propiedad archivo que viene de la request... 
        const { archivo } = files; // es lo mismo que archivo = req.files.archivo
        const nombreCortado = archivo.name.split('.'); //>> Devuelve un array del string cortado por "."
        const extension = nombreCortado[nombreCortado.length - 1];
    
        if (!extencionesValidas.includes(extension)){
            return reject(`La extencion ${ extension } no es valida, utilizar: ${ extencionesValidas }`);
        }
    
        // Genero el nombre del archivo
        const nombreTemp = uuidv4() + '.' + extension;

        //* Uso path.join porque sino __dirname apunta a la carpeta controllers, de esta manera creo el path global 
        //* para setear donde se va a guardar el archivo
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);
        
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
            }
    
            resolve( nombreTemp );
        });
    });


};

module.exports = {
    subirArchivo
};