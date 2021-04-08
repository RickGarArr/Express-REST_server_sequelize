import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import bcrypt from 'bcrypt';
import Categoria from '../modelos/categoria';
import Administrador from '../modelos/administrador';
import { generarToken } from "../helpers/JWToken";
import sendErrors from "../helpers/sendErrors";

export async function get(req: Request, res: Response) {
    const resp = await Categoria.findAll();
    const categoriasDB = resp.map(cat => {
        return cat.toJSON();
    })
    res.json({
        ok: true,
        categoriasDB
    });
}

export async function crearPerfil(req: Request, res: Response) {
    const { password, email } = req.body;
    try {
        const bcrypt_pass = bcrypt.hashSync(password, bcrypt.genSaltSync());
        const adminDB = await Administrador.create({email, password: bcrypt_pass}, {});

        const payload = {
            id: adminDB.id_usuario,
            email: adminDB.email,
            tipo: adminDB.tipo,
            fecha_creacion: adminDB.fecha_creacion
        }

        const token = generarToken(payload);
        res.json({
            token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            const errores = err.errors.map(error => `El valor ${error.value} ya existe en la base datos`);
            sendErrors(res, ...errores);
        } else {
            sendErrors(res, 'error al crear el usuario');
        }
    }
}

export async function login(req: Request, res: Response) {
    try {
        const adminDB = await Administrador.findOne({
            where: { email: req.body.email }
        });
        if (!adminDB) return sendErrors(res, 'Correo y/o contraseña no coinciden');
        if(!bcrypt.compareSync(req.body.password, adminDB.password)) return sendErrors(res, 'Correo y/o contraseña no coinciden');
        const payload = {
            id: adminDB.id_usuario,
            email: adminDB.email,
            tipo: adminDB.tipo,
            fecha_creacion: adminDB.fecha_creacion
        }

        const token = generarToken(payload);

        res.json({
            token
        });
    } catch (error) {
        console.log(error);
    }
}

export async function createCategoria(req: Request, res: Response) {

    try {
        const categoriaDB = await Categoria.create({nombre: req.body.nombre, descripcion: req.body.descripcion});
        res.json({
            msg: 'Categoria agregada correctamente'
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            const errores = err.errors.map(error => `El valor ${error.value} ya existe en la base datos`);
            sendErrors(res, ...errores);
        } else {
            sendErrors(res, 'error al crear categoria');
        }
        
    }
}