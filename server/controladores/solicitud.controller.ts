import { Request, Response } from 'express';
import moment from 'moment';
import sendErrors from '../helpers/sendErrors';
import ISolicitudRequest from '../interfaces/ISolicitudRequest';
import Solicitud from '../modelos/Solicitud';

export default class SolicitudController {
    public static async createSolicitud( request: Request, response: Response) {
        const ine = `${(request as ISolicitudRequest).directorio}/${(request as ISolicitudRequest).doc_ine}`;
        const rfc = `${(request as ISolicitudRequest).directorio}/${(request as ISolicitudRequest).doc_rfc}`;
        const comprobante_domicilio = `${(request as ISolicitudRequest).directorio}/${(request as ISolicitudRequest).doc_dom}`;
        const { nombre, email, telefono } = request.body;
        try {
            const solicitudDB = await Solicitud.create({
                nombre,
                email,
                telefono,
                ine,
                rfc,
                comprobante_domicilio,
                fecha_creacion: new Date()
            });
            response.json({
                solicitudDB
            });
        } catch (error) {
            sendErrors(response, 'Sucedio un error');
            console.log(error);
        }
    }
}