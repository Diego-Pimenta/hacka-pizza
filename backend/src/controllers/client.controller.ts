import { Request, Response, NextFunction } from 'express';
import * as ClientService from '../services/client.service';
import { clientSchema } from '../utils/zod';

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const client = await ClientService.createClient(data);
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await ClientService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const client = await ClientService.getClientById(id);
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const client = await ClientService.updateClient(id, data);
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await ClientService.deleteClient(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const checkExistingClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const client = await ClientService.getClientById(id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateClientData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = req.body;
    clientSchema.parse(client);
    next();
  } catch (error) {
    next(error);
  }
};
