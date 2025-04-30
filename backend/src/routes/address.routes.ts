import express from 'express';
import * as addressController from '../controllers/address.controller';

const router = express.Router();

router.post('/clients/:clientId/address', addressController.createAddress);
router.get('/clients/:clientId/address', addressController.getClientAddresses);
router.put('/address/:id', addressController.updateAddress);
router.delete('/address/:id', addressController.deleteAddress);

export default router;

