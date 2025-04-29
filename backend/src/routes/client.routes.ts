import { Router } from 'express';
import { protectAuth } from '../middlewares/auth.middleware';
import * as ClientController from '../controllers/client.controller';

const router = Router();

router.post('/', ClientController.validateClientData, ClientController.createClient);
router.get('/', ClientController.getClients);
router.get('/:id', ClientController.checkExistingClient, ClientController.getClientById);
router.put(
  '/:id',
  protectAuth,
  ClientController.validateClientData,
  ClientController.checkExistingClient,
  ClientController.updateClient
);
router.delete('/:id', protectAuth, ClientController.checkExistingClient, ClientController.deleteClient);

export default router;
