const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Guatemala = require('../models/usuario');



const equipogGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, nomProyecto ] = await Promise.all([
        Guatemala.countDocuments(query),
        Guatemala.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        nomProyecto
    });
}

const equipogPost = async(req, res = response) => {
    
    const { nomProyecto, monto, fecha, rol } = req.body;
    const usuario = new Guatemala({ nomProyecto, monto, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    nomProyecto.password = bcryptjs.hashSync( fecha, salt );

    // Guardar en BD
    await nomProyecto.save();

    res.json({
        nomProyecto
    });
}

const equipogPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, fecha, monto, ...resto } = req.body;

    if ( fecha ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.fecha = bcryptjs.hashSync( fecha, salt );
    }

    const nomProyecto = await Guatemala.findByIdAndUpdate( id, resto );

    res.json(nomProyecto);
}

const equipogPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const equipogDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const nomProyecto = await Guatemala.findByIdAndUpdate( id, { estado: false } );


    res.json(nomProyecto);
}




module.exports = {
    equipogGet,
    equipogPost,
    equipogPut,
    equipogPatch,
    equipogDelete,
}