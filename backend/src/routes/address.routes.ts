import express from 'express';
import * as addressController from '../controllers/address.controller';

const router = express.Router();

router.post('/clients/:clientId/address', addressController.validateAddressData, addressController.createAddress);
router.get('/clients/:clientId/address', addressController.getClientAddresses);
router.put('/address/:id', addressController.validateAddressUpdateData, addressController.checkExistingAddress, addressController.updateAddress);
router.delete('/address/:id', addressController.checkExistingAddress, addressController.deleteAddress);

export default router;
