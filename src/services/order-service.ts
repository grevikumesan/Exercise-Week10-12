import { prismaClient } from "../utils/database-util";
import { CreateOrderRequest } from "../models/order-model";
import { OrderValidation } from "../validations/order-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../errors/response-error";

export class OrderService {
  static async create(request: CreateOrderRequest) {
    const createRequest = Validation.validate(OrderValidation.CREATE, request);

    const customer = await prismaClient.customer.findUnique({
      where: { id: createRequest.customerId },
    });
    if (!customer) throw new ResponseError(404, "Customer not found");

    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id: createRequest.restaurantId },
    });
    if (!restaurant) throw new ResponseError(404, "Restaurant not found");

    const calculatedEta = createRequest.itemAmount * 10 + 10;

    const record = await prismaClient.order.create({
      data: {
        customer_id: createRequest.customerId,
        restaurant_id: createRequest.restaurantId,
        itemAmount: createRequest.itemAmount,
        eta: calculatedEta,
      },
      include: {
        customer: true,
        restaurant: true,
      },
    });

    return record;
  }

  static async getAll(customerId?: number, restaurantId?: number) {
    return await prismaClient.order.findMany({
      where: {
        ...(customerId && { customer_id: customerId }),
        ...(restaurantId && { restaurant_id: restaurantId }),
      },
      include: {
        customer: true,
        restaurant: true,
      },
    });
  }
}
