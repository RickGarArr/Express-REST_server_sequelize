import { Router } from 'express';
import admin from './admin.routes';
const rutas = Router();

rutas.use('/admin', admin);

export default rutas;