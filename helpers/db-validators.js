const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(role = '')=>{
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error(`El rol ${role} no está registrado`);
    }
}

const correoExiste = async(correo='')=> {
    const existe = await Usuario.findOne({correo});
    if ( existe ) {
        throw new Error(`El correo ${correo} ya está registrado`)
    }
} 

const existeUsuarioPorId = async(id)=> {
    const existe = await Usuario.findById(id);
    if ( !existe ) {
        throw new Error(`El usuario con el id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId
}