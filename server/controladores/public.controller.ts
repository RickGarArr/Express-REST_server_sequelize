import { Request, Response } from 'express';
import sendErrors from '../helpers/sendErrors';
import Categoria from '../modelos/categoria';

export default class PublicController {
    
    constructor() {

    }
    
    public static async getCategorias(request: Request, response: Response) {
        const pagina = Number(request.query.page) || 1;
        const perPage = 10;

        try {
            const categoriasDB = await Categoria.findAll({
                where: { esta_activa: true },
                limit: perPage,
                offset: (pagina * perPage - perPage)
            });
            response.json({
                pagina,
                total: categoriasDB.length,
                categorias: categoriasDB
            });
        } catch (err) {
            sendErrors(response, 'Error en la base de datos');
            console.log(err);
        }
    }

    public static async getProductos(request: Request, response: Response) {
        const pagina = Number(request.query.page) || 1;
        try {
            
        } catch (err) {
            console.log(err);
            sendErrors(response, 'error en la base de datos');
        }
    }
}
