
const {Router} = require('express');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete 
} = require('../controlles/usuarios');
const router = Router();

router.get('/',  usuariosGet)

//para pasar parametros de segmento y query se usa el : y nombre del parametro, este caso id
router.put('/:id', usuariosPut )

router.post('/', usuariosPost )

router.delete('/', usuariosDelete )

module.exports = router;