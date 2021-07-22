const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next)=> {
    const token = req.header('x-token');
    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY);
        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        // verificar que el usuario existe
        if (!usuario) {
            return res.status(401).json({
                ok:false,
                msg: 'Token no válido'
            })
        }
        // validar si el usuario no esta "eliminado" (estado en true)
        if (!usuario.estado) {
            return res.status(401).json({
                ok:false,
                msg: 'Token no válido'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}