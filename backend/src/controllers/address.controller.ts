import { Request, Response, NextFunction } from 'express';
import * as addressService from '../services/address.service';
import { addressSchema, addressUpdateSchema } from '../utils/zod';
import { ZodError } from 'zod';

export const createAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clientId } = req.params;
    const validatedData = addressSchema.parse(req.body);
    const address = await addressService.createAddress(clientId, validatedData);
    res.status(201).json(address);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(422).json({ errors: err.errors });
      return;
    }
    next(err);
  }
};

export const updateAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = addressUpdateSchema.parse(req.body);
    const address = await addressService.updateAddress(id, validatedData);
    res.status(200).json(address);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(422).json({ errors: err.errors });
      return;
    }
    next(err);
  }
};

export const getClientAddresses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clientId } = req.params;
    const address = await addressService.getClientAddresses(clientId);
    res.status(200).json(address);
  } catch (err: any) {
    next(err);
  }
};

export const deleteAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await addressService.deleteAddress(id);
    res.status(204).send();
  } catch (err: any) {
    next(err);
  }
};

export const validateAddressData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    addressSchema.parse(req.body);
    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(422).json({ errors: err.errors });
      return;
    }
    next(err);
  }
};

export const validateAddressUpdateData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    addressUpdateSchema.parse(req.body);
    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(422).json({ errors: err.errors });
      return;
    }
    next(err);
  }
};

export const checkExistingAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const address = await addressService.getAddressById(id);
    if (!address) {
      res.status(404).json({ success: false, error: { message: 'Address not found' } });
      return;
    }
    next();
  } catch (err: any) {
    next(err);
  }
};
