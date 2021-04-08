import { Router } from 'express';
import PublicController from '../controladores/public.controller';

const publicas = Router();

publicas.get('/categorias', PublicController.getCategorias); // todas las categorias
publicas.get('/productos', [ ]); // todos los productos
publicas.get('/productos/:comercio/:page', [ ]); // productos por vendedor
publicas.get('/productos/:categoria/:page', [ ]); // productos por categoria
publicas.get('/productos/:producto/:page', [ ]); // producto por id

export default publicas;
