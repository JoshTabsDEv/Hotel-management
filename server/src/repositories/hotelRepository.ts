import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../db/pool";
import { Hotel, HotelFilters, NewHotel } from "../types/hotel";

export const hotelRepository = {
  async findAll(filters: HotelFilters = {}): Promise<Hotel[]> {
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (filters.location) {
      conditions.push("location LIKE ?");
      params.push(`%${filters.location}%`);
    }
    if (filters.minPrice !== undefined) {
      conditions.push("price_per_night >= ?");
      params.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      conditions.push("price_per_night <= ?");
      params.push(filters.maxPrice);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `
      SELECT id, name, location, available_rooms AS availableRooms,
             price_per_night AS pricePerNight, rating,
             description, created_at AS createdAt, updated_at AS updatedAt
      FROM hotels
      ${whereClause}
      ORDER BY updated_at DESC
    `;

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows as unknown as Hotel[];
  },

  async findById(id: number): Promise<Hotel | null> {
    const query = `
      SELECT id, name, location, available_rooms AS availableRooms,
             price_per_night AS pricePerNight, rating,
             description, created_at AS createdAt, updated_at AS updatedAt
      FROM hotels
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] = await pool.query<RowDataPacket[]>(query, [id]);
    const hotel = rows[0] as unknown as Hotel | undefined;
    return hotel ?? null;
  },

  async create(data: NewHotel): Promise<Hotel> {
    const query = `
      INSERT INTO hotels (name, location, available_rooms, price_per_night, rating, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      data.name,
      data.location,
      data.availableRooms,
      data.pricePerNight,
      data.rating,
      data.description ?? null,
    ]);
    const id = result.insertId;
    const hotel = await this.findById(id);
    if (!hotel) {
      throw new Error("Failed to fetch hotel after creation");
    }
    return hotel;
  },

  async update(id: number, data: Partial<NewHotel>): Promise<Hotel | null> {
    if (Object.keys(data).length === 0) {
      return this.findById(id);
    }

    const fields: string[] = [];
    const params: (string | number | null)[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      params.push(data.name);
    }
    if (data.location !== undefined) {
      fields.push("location = ?");
      params.push(data.location);
    }
    if (data.availableRooms !== undefined) {
      fields.push("available_rooms = ?");
      params.push(data.availableRooms);
    }
    if (data.pricePerNight !== undefined) {
      fields.push("price_per_night = ?");
      params.push(data.pricePerNight);
    }
    if (data.rating !== undefined) {
      fields.push("rating = ?");
      params.push(data.rating);
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      params.push(data.description ?? null);
    }

    params.push(id);
    const query = `
      UPDATE hotels
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await pool.execute(query, params);
    return this.findById(id);
  },

  async remove(id: number): Promise<boolean> {
    const query = "DELETE FROM hotels WHERE id = ?";
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  },
};
