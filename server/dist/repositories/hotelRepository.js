"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRepository = void 0;
const pool_1 = require("../db/pool");
exports.hotelRepository = {
    async findAll(filters = {}) {
        const conditions = [];
        const params = [];
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
        const [rows] = await pool_1.pool.query(query, params);
        return rows;
    },
    async findById(id) {
        const query = `
      SELECT id, name, location, available_rooms AS availableRooms,
             price_per_night AS pricePerNight, rating,
             description, created_at AS createdAt, updated_at AS updatedAt
      FROM hotels
      WHERE id = ?
      LIMIT 1
    `;
        const [rows] = await pool_1.pool.query(query, [id]);
        const hotel = rows[0];
        return hotel !== null && hotel !== void 0 ? hotel : null;
    },
    async create(data) {
        var _a;
        const query = `
      INSERT INTO hotels (name, location, available_rooms, price_per_night, rating, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        const [result] = await pool_1.pool.execute(query, [
            data.name,
            data.location,
            data.availableRooms,
            data.pricePerNight,
            data.rating,
            (_a = data.description) !== null && _a !== void 0 ? _a : null,
        ]);
        const id = result.insertId;
        const hotel = await this.findById(id);
        if (!hotel) {
            throw new Error("Failed to fetch hotel after creation");
        }
        return hotel;
    },
    async update(id, data) {
        var _a;
        if (Object.keys(data).length === 0) {
            return this.findById(id);
        }
        const fields = [];
        const params = [];
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
            params.push((_a = data.description) !== null && _a !== void 0 ? _a : null);
        }
        params.push(id);
        const query = `
      UPDATE hotels
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
        await pool_1.pool.execute(query, params);
        return this.findById(id);
    },
    async remove(id) {
        const query = "DELETE FROM hotels WHERE id = ?";
        const [result] = await pool_1.pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};
//# sourceMappingURL=hotelRepository.js.map