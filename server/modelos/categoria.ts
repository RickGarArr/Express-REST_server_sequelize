import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import Conexion from '../clases/Conexion';

interface CategoriaAttributes {
    id_categoria: number;
    nombre: string;
    descripcion: string;
    esta_activa: boolean;
}

interface CategoriaOptional extends Optional<CategoriaAttributes, 'id_categoria' | 'esta_activa'> { }

export  default class Categoria extends Model<CategoriaAttributes, CategoriaOptional> implements CategoriaAttributes {
    public id_categoria!: number;
    public nombre!: string;
    public descripcion!: string;
    public esta_activa!: boolean;
}

Categoria.init({
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    esta_activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize: Conexion.getSequelize(),
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false
});