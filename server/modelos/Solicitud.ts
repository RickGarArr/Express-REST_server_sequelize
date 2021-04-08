import { DataTypes, Model, Optional } from 'sequelize';
import Conexion from '../clases/Conexion';

interface ISolicitudAtt {
    id_solicitud: number;
    nombre: string;
    email: string;
    telefono: number;
    ine: string;
    rfc: string;
    comprobante_domicilio: string;
    estado: string;
    fecha_creacion: Date;
}

interface ISolicitudAttOpcional extends Optional<ISolicitudAtt, 'id_solicitud' | 'estado'> { }

export default class Solicitud extends Model<ISolicitudAtt ,ISolicitudAttOpcional> implements ISolicitudAtt{
    estado!: 'pendiente' | 'revisando' | 'aceptada' | 'rechazada';
    id_solicitud!: number;
    nombre!: string;
    email!: string;
    telefono!: number;
    ine!: string;
    rfc!: string;
    comprobante_domicilio!: string;
    fecha_creacion!: Date;
}

Solicitud.init({
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.CHAR
    },
    email: {
        type: DataTypes.CHAR,
        unique: true
    },
    telefono: {
        type: DataTypes.CHAR,
    },
    ine: {
        type: DataTypes.CHAR
    },
    rfc: {
        type: DataTypes.CHAR
    },
    comprobante_domicilio: {
        type: DataTypes.CHAR
    },
    estado: {
        type: DataTypes.CHAR,
        defaultValue: 'pendiente'
    },
    fecha_creacion: {
        type: DataTypes.DATE
    }
},{
    sequelize: Conexion.getSequelize(),
    modelName: 'Solicitud',
    tableName: 'solicitudes',
    timestamps: false,
});