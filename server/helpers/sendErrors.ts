import { Response } from "express";

export default function sendErrors(res: Response, ...errores: string[]) {
    res.status(400).json({
        errores
    });
}