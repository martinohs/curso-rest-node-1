const path = require('path');
const fs  = require('fs');

const { response } = require("express");
const { model } = require("mongoose");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {

    //>> console.log('req.files >>>', req.files); // Envio por consola el archivo
    try {
        
        const nombre = await subirArchivo(req.files,undefined,'img');
        return res.json({ nombre });        
    } catch (error) {
        res.status(400).json({
            error
        }) 
    }    

};


const actualizarImagen = async (req, res = response) => {

    const { id , coleccion } = req.params;
    let modelo;
    switch ( coleccion ){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: 'No existe el usuario con esa id'
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: 'No existe el producto con esa id'
                })
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    // Limpiar imagenes previas
        console.log(modelo);
        if (modelo.img) {
            // Borro la imagen anterior
            console.log(modelo);
            const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync (pathImagen);
            }
        }
   


        const nombreImg = await subirArchivo(req.files,undefined,coleccion);
        modelo.img = nombreImg;

        await modelo.save();

        res.json(modelo);

}

const mostrarImagen = async (req, res = response) => {
    
    const { id , coleccion } = req.params;

    let modelo;

    switch ( coleccion ){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: 'No existe el usuario con esa id'
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: 'No existe el producto con esa id'
                })
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    } 

        // Limpiar imagenes previas
        console.log(modelo);
        if (modelo.img) {
            // Borro la imagen anterior
            console.log(modelo);
            const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            } 
        }
        
        const placeHolder = path.join(__dirname,'../assets/no-image.jpg');
        return res.sendFile(placeHolder);
        
        
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
};