import { z, ZodType } from "zod";

export class CustomerValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        phone: z.string().min(1)
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).optional(),  
        phone: z.string().min(1).optional()  
    });
}