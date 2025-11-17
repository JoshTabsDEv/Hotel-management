import { Request, Response } from "express";
import { hotelRepository } from "../repositories/hotelRepository";
import {
  createHotelSchema,
  updateHotelSchema,
} from "../validation/hotelSchema";
import { HotelFilters, NewHotel } from "../types/hotel";

const parseNumber = (value?: string): number | undefined => {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const hotelController = {
  async getHotels(req: Request, res: Response) {
    const filters: HotelFilters = {};
    const location = req.query.location?.toString();
    const minPrice = parseNumber(req.query.minPrice?.toString());
    const maxPrice = parseNumber(req.query.maxPrice?.toString());

    if (location) filters.location = location;
    if (minPrice !== undefined) filters.minPrice = minPrice;
    if (maxPrice !== undefined) filters.maxPrice = maxPrice;

    const hotels = await hotelRepository.findAll(filters);
    res.json(hotels);
  },

  async getHotelById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const hotel = await hotelRepository.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  },

  async createHotel(req: Request, res: Response) {
    const parseResult = createHotelSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult.error.format() });
    }
    const payload: NewHotel = {
      ...parseResult.data,
      description: parseResult.data.description ?? null,
    };

    const hotel = await hotelRepository.create(payload);
    res.status(201).json(hotel);
  },

  async updateHotel(req: Request, res: Response) {
    const id = Number(req.params.id);
    const existing = await hotelRepository.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const parseResult = updateHotelSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult.error.format() });
    }

    const payload: Partial<NewHotel> = {};
    if (parseResult.data.name !== undefined) payload.name = parseResult.data.name;
    if (parseResult.data.location !== undefined) payload.location = parseResult.data.location;
    if (parseResult.data.availableRooms !== undefined) {
      payload.availableRooms = parseResult.data.availableRooms;
    }
    if (parseResult.data.pricePerNight !== undefined) {
      payload.pricePerNight = parseResult.data.pricePerNight;
    }
    if (parseResult.data.rating !== undefined) payload.rating = parseResult.data.rating;
    if (parseResult.data.description !== undefined) {
      payload.description = parseResult.data.description ?? null;
    }

    const hotel = await hotelRepository.update(id, payload);
    res.json(hotel);
  },

  async deleteHotel(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await hotelRepository.remove(id);
    if (!deleted) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(204).send();
  },
};
