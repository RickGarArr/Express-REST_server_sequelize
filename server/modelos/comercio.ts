import { DataTypes, Model, Optional } from 'sequelize';

interface IComercioAttributes {
    id_comercio: number;
    id_usuario: number;
    imagen_perfil: string;
    rfc: string;
    ine: string;
    comprobante_domicilio: string;
}

interface IComercioOptionalAtt extends Optional<IComercioAttributes, 'imagen_perfil'> {
    
}