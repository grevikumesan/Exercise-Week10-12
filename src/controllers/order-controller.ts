import { Request, Response, NextFunction } from "express";
import { CreateOrderRequest } from "../models/order-model";
import { OrderService } from "../services/order-service";

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateOrderRequest = req.body as CreateOrderRequest;
      const response = await OrderService.create(request);
      res.status(201).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.query.customerId
        ? Number(req.query.customerId)
        : undefined;
      const restaurantId = req.query.restaurantId
        ? Number(req.query.restaurantId)
        : undefined;

      const response = await OrderService.getAll(customerId, restaurantId);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
