import { Router } from 'express';
import { protectAuth } from '../middlewares/auth.middleware';
import * as OrderController from '../controllers/order.controller';

const router = Router();

router.post('/', 
  OrderController.validateOrderData, 
  OrderController.createOrder
);

router.get('/', 
  OrderController.getOrders
);

router.get('/:id', 
  OrderController.checkExistingOrder, 
  OrderController.getOrderById
);

router.patch('/:id/status',
  protectAuth,
  OrderController.validateOrderUpdateData,
  OrderController.checkExistingOrder,
  OrderController.updateOrderStatus
);

router.delete('/:id', 
  protectAuth,
  OrderController.checkExistingOrder, 
  OrderController.deleteOrder
);

export default router;