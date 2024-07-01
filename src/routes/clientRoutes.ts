import { Router } from 'express';
import { getClients, addClient } from '../controllers/clientController';

const router = Router();

router.get('/clients', getClients);
router.post('/clients', addClient);

export default router;