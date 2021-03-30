import { Request, Response } from "express";
import Categoria from '../modelos/categoria';

export async function get(req: Request, res: Response) {
    const resp = await Categoria.findAll();
    const categoriasDB = resp.map(cat => {
        return cat.toJSON();
    })
    res.json({
        ok: true,
        categoriasDB
    })
}