
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { equipogGet,
    equipogPut,
    equipogPost,
    equipogDelete,
    equipogPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', equipogGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],equipogPut );

router.post('/',[
    check('nomProyecto', 'El nombre es obligatorio').not().isEmpty(),
    check('monto', 'El correo no es válido').isEmail(),
    check('monto').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], equipogPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],equipogDelete );

router.patch('/', equipogPatch );





module.exports = router;