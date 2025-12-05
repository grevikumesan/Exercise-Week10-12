import { prisma } from "../index";
import { CreateOrderRequest } from "../models/order-model";

export class OrderService {

    static async create(request: CreateOrderRequest) {
        
        const calculatedEta = (request.itemAmount * 10) + 10;

        const newOrder = await prisma.order.create({
            data: {
                customer_id: request.customerId,
                restaurant_id: request.restaurantId,
                itemAmount: request.itemAmount,
                eta: calculatedEta 
            },
            include: {
                customer: true,
                restaurant: true
            }
        });

        return newOrder;
    }

    static async getAll() {
        return await prisma.order.findMany({
            include: {
                customer: true,   
                restaurant: true  
            }
        });
    }
}