import { Model } from "sequelize/types";

export interface IAdmin extends Model{
    id_usuario: number;
    email: string;
    password: string;
    tipo: string;
    fecha_creacion: Date;
}