const { validationResult } = require("express-validator")


const validarCampos = (req, res, next)=> {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    //si pasa los anteriores middlewares, sigue con el siguiente middleware o controlador
    next();
}

module.exports = {
    validarCampos
}