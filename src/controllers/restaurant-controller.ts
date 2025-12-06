import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurant-service";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
} from "../models/restaurant-model";

export class RestaurantController {
  static async create(req: Request, res: Response) {
    try {
      const request: CreateRestaurantRequest = req.body;
      const response = await RestaurantService.create(request);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: "Gagal membuat restaurant" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const isOpen =
        req.query.isOpen === "true"
          ? true
          : req.query.isOpen === "false"
          ? false
          : undefined;

      const response = await RestaurantService.getAll(isOpen);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data restaurant" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const request: UpdateRestaurantRequest = { id, ...req.body };

      const response = await RestaurantService.update(request);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Gagal update restaurant" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await RestaurantService.delete(id);
      res.status(200).json({ message: "Restaurant berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ error: "Gagal menghapus restaurant" });
    }
  }
}
