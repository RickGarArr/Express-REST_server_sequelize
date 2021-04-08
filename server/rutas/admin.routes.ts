import { Router } from 'express';
import { check, header } from 'express-validator';
import { crearPerfil, createCategoria, get, login } from '../controladores/admin.controller';
import validarCampos from '../middlewares/verificarCampos';
import validarClave from '../middlewares/validarClave';
import { validarTokenAdmin } from '../middlewares/validarToken';
const admin = Router();

admin.get('/', get);

admin.post('/signup', [
    check('email', 'parametro {email} es necesario').not().isEmpty().trim().normalizeEmail({all_lowercase: true}),
    check('password', 'parametro {password} es necesario').notEmpty().trim().escape(),
    check('clave', 'parametro {clave} es necesario').notEmpty().trim().escape(),
    validarCampos,
    validarClave
], crearPerfil);

admin.post('/login', [
    check('email', 'parametro {email} es necesario').not().isEmpty().trim().normalizeEmail({all_lowercase: true}),
    check('password', 'parametro {password} es necesario').notEmpty().trim().escape(),
    validarCampos
], login);

admin.post('/categorias', [
    validarTokenAdmin,
    check('nombre', 'parametro {nombre} es necesario').notEmpty().trim().escape(),
    check('descripcion', 'parametro {descripcion} es necesario').notEmpty().trim().escape(),
    validarCampos
], createCategoria);

admin.delete('/categorias/:id_ategoria', [
    validarTokenAdmin
]);

admin.put('/categorias/:id_categoria', [
    validarTokenAdmin
]);

export default admin;