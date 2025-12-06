import { z, ZodType } from "zod";

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        customerId: z.number().positive("Customer ID must be valid"),
        restaurantId: z.number().positive("Restaurant ID must be valid"),
        itemAmount: z.number().min(1, "Item amount must be at least 1")
    });
}