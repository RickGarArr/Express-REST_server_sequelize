import { DataTypes, Model, Optional } from 'sequelize';
import Conexion from '../clases/Conexion';

interface AdministradorAttributes {
    id_usuario: number;
    email: string;
    password: string;
    fecha_creacion: Date;
    tipo: string;
};

interface AdministradorOptional extends Optional<AdministradorAttributes, 'id_usuario' | 'tipo' | 'fecha_creacion'> {};

export default class Administrador extends Model<AdministradorAttributes, AdministradorOptional> implements AdministradorAttributes  {
    public id_usuario!: number;
    public email!: string;
    public password!: string;
    public fecha_creacion!: Date;
    public tipo!: string;

}

Administrador.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
    },
    tipo: {
        type: DataTypes.CHAR,
        defaultValue: 'admin'
    }
},{
    sequelize: Conexion.getSequelize(),
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: false
});