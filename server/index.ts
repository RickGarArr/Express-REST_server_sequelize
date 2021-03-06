import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import Server from './clases/server';
import Conexion from './clases/Conexion';
import moment from 'moment';

Conexion.createSequelize();
Conexion.autenticar();

const server = new Server(3030);
const app: Express.Application = server.getApp();

console.log(moment().format('YYYY-MM-DD HH:MM:SS'));

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

import rutas from './rutas/todas';
app.use(rutas);

server.start(() =>{
    console.log('servidor escuchando en el puerto', server.getPort());
});