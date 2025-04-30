import { Request, Response, NextFunction } from 'express';
import * as ProductService from '../services/product.service';
import { productSchema } from '../utils/zod';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await ProductService.createProduct(data);
    res.status(201).json({ success: true, product: product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    res.status(200).json({ success: true, product: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = productSchema.parse(req.body);
    const product = await ProductService.updateProduct(id, data);
    res.status(200).json({ success: true, product: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const checkExistingProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    if (!product) {
      res.status(404).json({ success: false, error: { message: 'Product not found' } });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateProductData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    productSchema.parse(product);
    next();
  } catch (error) {
    next(error);
  }
};
