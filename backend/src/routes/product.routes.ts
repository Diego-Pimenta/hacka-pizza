import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router = Router();

router.post('/', ProductController.validateProductData, ProductController.createProduct);
router.get('/name', ProductController.getProductByName);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.checkExistingProduct, ProductController.getProductById);
router.put(
  '/:id',
  ProductController.validateProductData,
  ProductController.checkExistingProduct,
  ProductController.updateProduct
);
router.delete('/:id', ProductController.checkExistingProduct, ProductController.deleteProduct);

export default router;
