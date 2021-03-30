import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import sendErrors from "../helpers/sendErrors";

export default function validarCampos(req: Request, res: Response, next: NextFunction) {
    const errores = validationResult(req);
    if (errores.isEmpty()) {
      next();
    } else {
        const mapErrores: string[] = errores.array().map( error => {
            return error.msg;
        });
        sendErrors(res, ...mapErrores);
    }

}