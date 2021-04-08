import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import generarNombreUnico from '../helpers/generarNombreUnico';
import sendErrors from '../helpers/sendErrors';
import moment from 'moment';
import uniqid from 'uniqid';
import ISolicitudRequest from '../interfaces/ISolicitudRequest';
import eliminarDirectorio from '../helpers/eliminarDirectorio';

export default function solicitudFileHandler(req: Request, res: Response, next: NextFunction) {

    (req as ISolicitudRequest).directorio = `${moment().format('YYYYMMDDHHss')}_${uniqid()}`;
    
    let upload = multer({ storage: storage, fileFilter: fileFilter }).any();

    upload(req, res, function (err: any) {

        if (!req.files) return sendErrors(res, 'No Ha subido ningun archivos');

        const fieldNames = new Set();
        (req.files as Array<Express.Multer.File>).forEach(file => {
            fieldNames.add(file.fieldname);
        });

        const errores: string[] = [];

        if (!fieldNames.has('doc_ine')) errores.push('El campo {doc_ine} es necesario');
        if (!fieldNames.has('doc_rfc')) errores.push('El campo {doc_rfc} es necesario');
        if (!fieldNames.has('doc_dom')) errores.push('El campo {doc_dom} es necesario');

        if (errores.length > 0) {
            eliminarDirectorio(path.join(__dirname, `../uploads/${(req as ISolicitudRequest).directorio}`));
            return sendErrors(res, ...errores);
        };

        if (err instanceof multer.MulterError) {
            return sendErrors(res, err.message);
        } else if (err instanceof Error) {
            return sendErrors(res, err.message);
        } else if (req.files == undefined || req.files.length === 0) {
            return sendErrors(res, 'No se subió ningun archivo');
        }
        next();
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToSave = path.resolve(__dirname, `../uploads/${(req as ISolicitudRequest).directorio}`);
        if (!fs.existsSync(pathToSave)) {
            fs.mkdirSync(pathToSave, { recursive: true });
        }
        callback(null, pathToSave);
    },
    filename: function (req, file, callback) {
        const nombreUnico = generarNombreUnico(file.originalname);
        switch(file.fieldname) {
            case 'doc_ine': (req as ISolicitudRequest).doc_ine = nombreUnico; break;
            case 'doc_rfc': (req as ISolicitudRequest).doc_rfc = nombreUnico; break;
            case 'doc_dom': (req as ISolicitudRequest).doc_dom = nombreUnico; break;
        }
        callback(null, nombreUnico);
    }
});

const fileFilter = function (req: any, file: Express.Multer.File, cb: FileFilterCallback) {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1].toLocaleLowerCase();
    const extValidas = ['pdf', 'jpg', 'jpeg'];
    const fieldNames = ['doc_ine', 'doc_rfc', 'doc_dom'];
    if (!extValidas.includes(ext)) {
        cb(new Error('Error, tipo de archivo no valido'));
    } else if (!fieldNames.includes(file.fieldname)) {
        cb(new Error('Error, campos validos [ doc_ine, doc_rfc, doc_dom ]'));
    } else {
        cb(null, true);
    }
};