import { NextFunction, Request, Response } from 'express';
import * as OrderService from '../services/order.service';
import { orderSchema, orderUpdateSchema } from '../utils/zod';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = orderSchema.parse(req.body);
    const order = await OrderService.createOrder(data);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = orderUpdateSchema.parse(req.body);
    const order = await OrderService.updateOrderStatus(id, data.status);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await OrderService.deleteOrder(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getRevenueSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await OrderService.getRevenueSummary();
    res.status(200).json({ success: true, data: summary});
  } catch (error) {
    next(error)
  }
};

export const checkExistingOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const order = await OrderService.getOrderById(id);
    if (!order) {
      res.status(404).json({ success: false, error: { message: 'Order not found' } });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateOrderData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    orderSchema.parse(order);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateOrderUpdateData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    orderUpdateSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};
