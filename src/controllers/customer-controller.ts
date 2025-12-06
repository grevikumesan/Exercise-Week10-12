import { Request, Response, NextFunction } from "express";
import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../models/customer-model";
import { CustomerService } from "../services/customer-service";

export class CustomerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCustomerRequest = req.body as CreateCustomerRequest;
      const response = await CustomerService.create(request);
      res.status(201).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CustomerService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
        const customerId = Number(req.params.id);
        const response = await CustomerService.getById(customerId);
        res.status(200).json({ data: response });
    } catch (e) {
        next(e);
    }
}

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateCustomerRequest = req.body as UpdateCustomerRequest;
      request.id = Number(req.params.id);

      const response = await CustomerService.update(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = Number(req.params.id);
      await CustomerService.delete(customerId);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
}
