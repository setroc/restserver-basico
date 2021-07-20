const {response} = require('express')

const usuariosGet = (req, res = response) => {
    const {q, nombre, apikey} = req.query;
    res.json({
        ok: true,
        msg: 'get api - controlador',
        q, 
        nombre, 
        apikey
    })
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put api - controlador',
        id
    })
}
const usuariosPost = (req, res = response) => {

    //datos que se pasan por el body de la peticion
    const {name, edad} = req.body;
    res.json({
        ok: true,
        msg: 'post api - controlador',
        name,
        edad,
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete api - controlador',
    })
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}