  const existeArchivo = (req, res = response, next) => {
      
     //Controlo que haya enviado un archivo (req.files puede traer muchos archivos, asi q le asigno (por postman ) la propiedad archivo q es la q usaremos)
     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
       res.status(400).send('No files were uploaded. existeArchivo');
       return;
    }

    next();

  }

  module.exports = {
      existeArchivo
  }