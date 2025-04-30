import { Router } from 'express';
import { protectAuth } from '../middlewares/auth.middleware';
import * as ClientController from '../controllers/client.controller';

const router = Router();

router.post('/', ClientController.validateClientData, ClientController.createClient);
router.get('/', ClientController.getClients);
router.get('/phone/:phone', ClientController.getClientByPhoneNumber);
router.get('/:id', ClientController.checkExistingClient, ClientController.getClientById);
router.put(
  '/:id',
  ClientController.validateClientDataUpdate,
  ClientController.checkExistingClient,
  ClientController.updateClient
);
router.delete('/:id', ClientController.checkExistingClient, ClientController.deleteClient);

export default router;
