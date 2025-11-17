import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  availableRooms: z.number().int().min(0),
  pricePerNight: z.number().min(0),
  rating: z.number().min(0).max(5),
  description: z.string().max(500).optional().nullable(),
});

export const updateHotelSchema = createHotelSchema.partial();

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
