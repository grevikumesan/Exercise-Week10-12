import { Request, Response } from 'express';
import { OrderService } from '../services/order-service';
import { CreateOrderRequest } from '../models/order-model';

export class OrderController {

    static async create(req: Request, res: Response) {
        try {
            const request: CreateOrderRequest = req.body;
            
            if (!request.customerId || !request.restaurantId || !request.itemAmount) {
                 res.status(400).json({ error: "Customer ID, Restaurant ID, dan Item Amount wajib diisi" });
                 return;
            }

            const response = await OrderService.create(request);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: "Gagal membuat order", detail: error });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const response = await OrderService.getAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: "Gagal mengambil data order" });
        }
    }
}