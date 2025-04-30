import { Request, Response } from 'express';
import * as addressService from '../services/address.service';

export const createAddress = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const address = await addressService.createAddress(clientId, req.body);
    res.status(201).json(address);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getClientAddresses = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const address = await addressService.getClientAddresses(clientId);
    res.status(200).json(address);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const address = await addressService.updateAddress(id, req.body);
    res.status(200).json(address);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await addressService.deleteAddress(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
