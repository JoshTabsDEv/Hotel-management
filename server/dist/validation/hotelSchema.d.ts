import { z } from "zod";
export declare const createHotelSchema: z.ZodObject<{
    name: z.ZodString;
    location: z.ZodString;
    availableRooms: z.ZodNumber;
    pricePerNight: z.ZodNumber;
    rating: z.ZodNumber;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updateHotelSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    availableRooms: z.ZodOptional<z.ZodNumber>;
    pricePerNight: z.ZodOptional<z.ZodNumber>;
    rating: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, z.core.$strip>;
export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
//# sourceMappingURL=hotelSchema.d.ts.map