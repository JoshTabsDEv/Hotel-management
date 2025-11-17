export interface Hotel {
  id: number;
  name: string;
  location: string;
  availableRooms: number;
  pricePerNight: number;
  rating: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HotelPayload {
  name: string;
  location: string;
  availableRooms: number;
  pricePerNight: number;
  rating: number;
  description?: string | null;
}

export interface HotelFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}
