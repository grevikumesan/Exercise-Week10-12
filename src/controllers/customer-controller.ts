import { Request, Response } from 'express';
import { CustomerService } from '../services/customer-service';
import { CreateCustomerRequest } from '../models/customer-model';

export class CustomerController {

    static async create(req: Request, res: Response) {
        try {
            const request: CreateCustomerRequest = req.body as CreateCustomerRequest;
            
            const response = await CustomerService.create(request);
            
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: "Gagal membuat customer" });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const response = await CustomerService.getAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: "Gagal ambil data" });
        }
    }
}