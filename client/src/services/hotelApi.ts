import axios from "axios";
import type { Hotel, HotelFilters, HotelPayload } from "../types/hotel";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const hotelApi = {
  async list(filters: HotelFilters = {}): Promise<Hotel[]> {
    const params = new URLSearchParams();
    if (filters.location) params.append("location", filters.location);
    if (filters.minPrice !== undefined) params.append("minPrice", String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.append("maxPrice", String(filters.maxPrice));

    const response = await api.get<Hotel[]>(`/hotels`, { params });
    return response.data;
  },

  async create(payload: HotelPayload): Promise<Hotel> {
    const response = await api.post<Hotel>("/hotels", payload);
    return response.data;
  },

  async update(id: number, payload: Partial<HotelPayload>): Promise<Hotel> {
    const response = await api.put<Hotel>(`/hotels/${id}`, payload);
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/hotels/${id}`);
  },
};
