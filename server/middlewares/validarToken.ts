import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../helpers/JWToken";
import sendErrors from "../helpers/sendErrors";
import Administrador from "../modelos/administrador";

export async function validarTokenAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.get('token');
    if (!token) {
        return sendErrors(res, 'no hay token en la peticion');
    }
    try {
        const decoded = await decodeToken(token);
        if ((decoded as decodedAdmin).tipo != 'admin') return sendErrors(res, 'token no es valido');
        const admin = await Administrador.findOne({ attributes: { include: [ 'email' ]}, where: { email: (decoded as decodedAdmin).email }});
        if (!admin) return sendErrors(res, 'Token no es valido');
        req.body.admin = admin;
        next();
    } catch (err) {
        sendErrors(res, err);
    }
}

interface decodedAdmin {
    id: number;
    email: string;
    iat: string;
    exp: string;
    tipo: string;
}