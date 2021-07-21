const {Router} = require('express');
const { check } = require('express-validator');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete 
} = require('../controllers/usuarios');

const { 
    esRoleValido, 
    correoExiste, 
    existeUsuarioPorId
} = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get(
    '/',
    usuariosGet)

//para pasar parametros de segmento y query se usa el : y nombre del parametro, este caso id
router.put(
    '/:id',
    [   //middlewares
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('role').custom( esRoleValido ),
        validarCampos
    ],
    usuariosPut)

router.post(
    '/',
    [   //middlewares
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener más de 6 carácteres').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( correoExiste ),
        // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( esRoleValido ),
        validarCampos
    ],
    usuariosPost )

router.delete(
    '/:id',
    [   //middleware
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
    ],
    usuariosDelete )

module.exports = router;