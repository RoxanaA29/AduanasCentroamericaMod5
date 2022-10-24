
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nomProyecto: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    monto: {
        type: String,
        required: [true, 'El monto obligatorio'],
        unique: true
    },
    fecha: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, monto, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
