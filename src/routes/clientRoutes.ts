import { Router } from 'express';
import { body } from 'express-validator';
import { getClients, addClient } from '../controllers/clientController';

const router = Router();

router.get('/clients', getClients);
router.post('/clients',
[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid')
], addClient);

export default router;