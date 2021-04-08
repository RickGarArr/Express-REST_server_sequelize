import { Sequelize } from 'sequelize';

export default class Conexion {

    private static sequelize: Sequelize;

    public static createSequelize() {
        console.log('creando sequelize');
        Conexion.sequelize = new Sequelize(
            process.env.DB_SCHEMA as string,
            process.env.DB_USER as string,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                dialect: 'mysql',
                timezone: '-06:00',
                logging: false,
                define: {
                    charset: 'utf8mb4',
                    collate: 'utf8mb4_0900_ai_ci',
                    engine: 'innoDB'
                },
                pool: {
                    min: 0,
                    max: 5,
                    acquire: 30000,
                    idle: 10000
                }
            }
        );
    }

    static autenticar() {
        Conexion.sequelize.authenticate().then(() => {
            console.log('Base de Datos Online');
        }).catch(err => {
            console.log('Error al conectar a la base de datos: Error ', err);
        });
    }

    static getSequelize() {
        return Conexion.sequelize;
    }
}
