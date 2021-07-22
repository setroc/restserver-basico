const { response } = require('express');
const bcryptjs = require('bcryptjs') 

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res=response)=> {
    try {
        const {password, correo} =req.body;
        //verificar si existe el mail
        const usuario = await Usuario.findOne({correo});
        console.log(usuario)
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Usuario o contraseña incorrectos'
            })
        }
        //verificar si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok:false,
                msg: 'Usuario o contraseña incorrectos'
            })
        }
        //generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Login Ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok:false,
            msg: 'Algo salio mal, hable con el administrador'
        })
    }
}

module.exports = {
    login
}

