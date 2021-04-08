import jwt from 'jsonwebtoken';

export function generarToken(payload: Object) {
    return jwt.sign(payload, process.env.SECRET as string, {expiresIn: '10h'});
}

interface decoded extends Object {
    id: number;
    email: string;
    iat: string;
    exp: string;
}

export function decodeToken(token: string) {
    return new Promise((resolve, reject) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET as string);
            resolve(decoded);
        } catch (err) {
            reject('Token no es valido');
        }
    });
}