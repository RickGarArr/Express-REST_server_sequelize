import { Sequelize, DataTypes, Model } from 'sequelize';
import Conexion from '../clases/Conexion';

export  default class Categoria extends Model {
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
        type: DataTypes.BOOLEAN
    }
},{
    sequelize: Conexion.getSequelize(),
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false
});