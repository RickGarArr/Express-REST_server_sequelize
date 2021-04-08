import { Router } from 'express';
import { check } from 'express-validator';
import SolicitudController from '../controladores/solicitud.controller';
import validarCampos from '../middlewares/verificarCampos';
import solicitudFileHandler from '../middlewares/handlerSolicitudFiles';

const solicitud = Router();

solicitud.post('/', [
    solicitudFileHandler,
    check('nombre', 'el parametro {nombre} es necesario').notEmpty().trim().escape(),
    check('email', 'el parametro {email} es necesario').isEmail().normalizeEmail({all_lowercase: true}),
    check('telefono', 'el parametro {telefono} es necesario').notEmpty().trim().escape(),
    validarCampos
],SolicitudController.createSolicitud);

export default solicitud;