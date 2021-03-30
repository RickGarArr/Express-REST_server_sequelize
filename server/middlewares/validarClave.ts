import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';

import sendErrors from "../helpers/sendErrors";

export default function validarClave(req: Request, res: Response, next: NextFunction) {
    const clave = req.body.clave;
    if(bcrypt.compareSync(clave, process.env.CODE as string)) {
        next();
    } else {
        sendErrors(res, 'Clave no es correcta');
    }
}