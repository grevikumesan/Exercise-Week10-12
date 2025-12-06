import { prismaClient } from "../utils/database-util";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
} from "../models/restaurant-model";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../errors/response-error";

export class RestaurantService {
  static async create(request: CreateRestaurantRequest) {
    const createRequest = Validation.validate(
      RestaurantValidation.CREATE,
      request
    );

    const record = await prismaClient.restaurant.create({
      data: {
        name: createRequest.name,
        description: createRequest.description,
        isOpen: createRequest.isOpen ?? true,
      },
    });

    return record;
  }

  static async getAll(isOpen?: boolean) {
    return await prismaClient.restaurant.findMany({
      where: isOpen !== undefined ? { isOpen } : {},
    });
  }

  static async update(request: UpdateRestaurantRequest) {
    const updateRequest = Validation.validate(
      RestaurantValidation.UPDATE,
      request
    );

    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id: updateRequest.id },
    });

    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found");
    }

    return await prismaClient.restaurant.update({
      where: { id: updateRequest.id },
      data: {
        name: updateRequest.name,
        description: updateRequest.description,
        isOpen: updateRequest.isOpen,
      },
    });
  }

  static async delete(id: number) {
    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id: id },
    });

    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found");
    }

    return await prismaClient.restaurant.delete({
      where: { id: id },
    });
  }
}
