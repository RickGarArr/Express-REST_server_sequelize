import jwt from 'jsonwebtoken';

export function generarToken(payload: Object) {
    return jwt.sign(payload, process.env.SECRET as string, {expiresIn: '10h'});
}