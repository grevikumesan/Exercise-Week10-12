import { prismaClient } from "../utils/database-util";
import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../models/customer-model";
import { CustomerValidation } from "../validations/customer-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../errors/response-error";

export class CustomerService {
  static async create(request: CreateCustomerRequest) {
    const createRequest = Validation.validate(
      CustomerValidation.CREATE,
      request
    );

    const record = await prismaClient.customer.create({
      data: createRequest,
    });

    return record;
  }

  static async getAll() {
    return await prismaClient.customer.findMany();
  }

  static async getById(id: number) {
    const customer = await prismaClient.customer.findUnique({
      where: { id },
      include: { orders: true },
    });

    if (!customer) {
      throw new ResponseError(404, "Customer not found");
    }

    return customer;
  }

  static async update(request: UpdateCustomerRequest) {
    const updateRequest = Validation.validate(
      CustomerValidation.UPDATE,
      request
    );

    const customer = await prismaClient.customer.findUnique({
      where: { id: updateRequest.id },
    });

    if (!customer) {
      throw new ResponseError(404, "Customer not found");
    }

    return await prismaClient.customer.update({
      where: { id: updateRequest.id },
      data: {
        name: updateRequest.name,
        phone: updateRequest.phone,
      },
    });
  }

  static async delete(id: number) {
    const customer = await prismaClient.customer.findUnique({
      where: { id: id },
    });

    if (!customer) {
      throw new ResponseError(404, "Customer not found");
    }

    return await prismaClient.customer.delete({
      where: { id: id },
    });
  }
}
