const { response } = require("express")


const adminRole = (req, res=response, next)=> {
    if (!req.usuario) {
        res.status(500).json({
            ok:false,
            msg: 'Se quiere verificar el rol sin verificar el JWT primero'
        })
    }
    const {role, nombre} = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        res.status(401).json({
            ok:false,
            msg: `${nombre} no es adminstrador`
        })
    }
    next();
} 

const tieneRole = (...roles )=> {
    return (req, res=response, next)=> {
        if (!req.usuario) {
            res.status(500).json({
                ok:false,
                msg: 'Se quiere verificar el rol sin verificar el JWT primero'
            })
        }
        if ( !roles.includes(req.usuario.role) ){
            res.status(401).json({
                ok:false,
                msg: `${req.usuario.nombre} no tiene un rol permitido para realizar esta acción`
            })
        }
        next();
    }
}

module.exports = {
    adminRole,
    tieneRole
}