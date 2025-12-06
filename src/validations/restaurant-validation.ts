import { z, ZodType } from "zod";

export class RestaurantValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        isOpen: z.boolean().optional() 
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).optional(),        
        description: z.string().min(1).optional(), 
        isOpen: z.boolean().optional()             
    });
}