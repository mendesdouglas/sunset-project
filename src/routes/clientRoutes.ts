import { Router } from 'express';
import { body, param } from 'express-validator';
import { getClients, addClient, updateClientById, deleteClientById} from '../controllers/clientController';

const router = Router();

router.get('/clients', getClients);
router.post('/clients',
[
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('email').isEmail().withMessage('Email must be valid')
], addClient);

router.put('/clients/:id',updateClientById);
router.delete('/clients/:id',deleteClientById);

export default router;