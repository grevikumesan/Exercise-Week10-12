import { prisma } from "../index";
import { CreateRestaurantRequest, UpdateRestaurantRequest } from "../models/restaurant-model";

export class RestaurantService {

    static async create(request: CreateRestaurantRequest) {
        return await prisma.restaurant.create({
            data: {
                name        : request.name,
                description : request.description,
                isOpen      : request.isOpen ?? true // Kalau tidak diisi, default True (Buka)
            }
        });
    }

    static async getAll() {
        return await prisma.restaurant.findMany();
    }

    static async update(request: UpdateRestaurantRequest) {
        return await prisma.restaurant.update({
            where: { id: request.id },
            data: {
                name        : request.name,
                description : request.description,
                isOpen      : request.isOpen
            }
        });
    }

    static async delete(id: number) {
        return await prisma.restaurant.delete({
            where: { id: id }
        });
    }
}