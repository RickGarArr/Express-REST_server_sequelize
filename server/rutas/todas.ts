import { Router } from 'express';
import admin from './admin.routes';
import publicas from './public.routes';
import solicitud from './solicitud.routes';

const rutas = Router();

rutas.use('/admin', admin);
rutas.use('/public', publicas);
rutas.use('/solicitud', solicitud);

export default rutas;