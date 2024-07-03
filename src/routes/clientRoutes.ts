import { Router } from 'express';
import { body, param } from 'express-validator';
import { getClients, addClient, updateClientById, deleteClientById} from '../controllers/clientController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API para gerenciar clientes
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retorna a lista de clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Uma lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Client'
 */
router.get('/clients', getClients)

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Adiciona um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewClient'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Client'
 *       400:
 *         description: Dados inválidos
 */
    
router.post('/clients',
[
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('email').isEmail().withMessage('Email must be valid')
], addClient);


/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Client'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/clients/:id',updateClientById);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/clients/:id',deleteClientById);
/**
 * @swagger
 * definitions:
 *   Client:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - email
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       name:
 *         type: string
 *       email:
 *         type: string
 *   NewClient:
 *     type: object
 *     required:
 *       - name
 *       - email
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 */

export default router;