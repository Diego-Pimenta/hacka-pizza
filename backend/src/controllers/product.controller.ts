import { Request, Response, NextFunction } from 'express';
import * as ProductService from '../services/product.service';
import { productSchema, productUpdateSchema } from '../utils/zod';
import { ZodError } from 'zod';

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = productSchema.parse(req.body);
    const product = await ProductService.createProduct(data);
    res.status(201).json({ success: true, product });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(422).json({ errors: error.errors });
      return;
    }
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = productUpdateSchema.parse(req.body);
    const product = await ProductService.updateProduct(id, data);
    res.status(200).json({ success: true, product });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(422).json({ errors: error.errors });
      return;
    }
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getProductByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      res.status(400).json({
        success: false,
        error: { message: 'Query param "name" is required and must be a string' },
      });
      return;
    }

    const products = await ProductService.getProductByName(name);
    res.status(200).json({ success: true, products });
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

export const validateProductData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(422).json({ errors: error.errors });
      return;
    }
    next(error);
  }
};

export const validateProductDataUpdate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    productUpdateSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(422).json({ errors: error.errors });
      return;
    }
    next(error);
  }
};
