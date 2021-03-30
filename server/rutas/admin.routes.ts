import { Router } from 'express';
import { get } from '../controladores/admin.controller';
const admin = Router();

admin.get('/', get);

export default admin;