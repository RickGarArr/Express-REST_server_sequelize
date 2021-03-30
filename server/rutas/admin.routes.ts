import { Router } from 'express';
import { check } from 'express-validator';
import { crearPerfil, get, login } from '../controladores/admin.controller';
import validarCampos from '../middlewares/verificarCampos';
import validarClave from '../middlewares/validarClave';
const admin = Router();

admin.get('/', get);

admin.post('/acount', [
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

export default admin;