const {response} = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {
    const { limite=5, desde=0 } = req.query;
    //{estado:true} nos traera la info solo de los que tienen ese valor
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        ok: true,
        total, 
        usuarios
    })
}
const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;
    if ( password ) { //actualizar contraseña
        //hacer hash de la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        ok: true,
        usuario
    })
}
const usuariosPost = async(req, res = response) => {
    //datos que se pasan por el body de la peticion
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });
    //hacer hash de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //grabar en db
    await usuario.save();
    res.json({
        ok: true,
        usuario
    })
}
const usuariosDelete = async(req, res = response) => {
    const id = req.params.id;

    //Para cambiar el estado del usuario y "eliminarlo"
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})

    //Para borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        ok: true,
        usuario
    })
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}