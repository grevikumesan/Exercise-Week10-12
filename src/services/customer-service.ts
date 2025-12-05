import { prisma } from "../index"; 
import { CreateCustomerRequest, CustomerResponse } from "../models/customer-model";

export class CustomerService {
    
    static async create(request: CreateCustomerRequest): Promise<CustomerResponse> {
        
        const newCustomer = await prisma.customer.create({
            data: {
                name    : request.name,
                phone   : request.phone
            }
        });

        return newCustomer;
    }

    static async getAll(): Promise<CustomerResponse[]> {
        return await prisma.customer.findMany();
    }
}