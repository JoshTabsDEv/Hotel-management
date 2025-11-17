"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelController = void 0;
const hotelRepository_1 = require("../repositories/hotelRepository");
const hotelSchema_1 = require("../validation/hotelSchema");
const parseNumber = (value) => {
    if (value === undefined)
        return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
exports.hotelController = {
    async getHotels(req, res) {
        var _a, _b, _c;
        const filters = {};
        const location = (_a = req.query.location) === null || _a === void 0 ? void 0 : _a.toString();
        const minPrice = parseNumber((_b = req.query.minPrice) === null || _b === void 0 ? void 0 : _b.toString());
        const maxPrice = parseNumber((_c = req.query.maxPrice) === null || _c === void 0 ? void 0 : _c.toString());
        if (location)
            filters.location = location;
        if (minPrice !== undefined)
            filters.minPrice = minPrice;
        if (maxPrice !== undefined)
            filters.maxPrice = maxPrice;
        const hotels = await hotelRepository_1.hotelRepository.findAll(filters);
        res.json(hotels);
    },
    async getHotelById(req, res) {
        const id = Number(req.params.id);
        const hotel = await hotelRepository_1.hotelRepository.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json(hotel);
    },
    async createHotel(req, res) {
        var _a;
        const parseResult = hotelSchema_1.createHotelSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.format() });
        }
        const payload = {
            ...parseResult.data,
            description: (_a = parseResult.data.description) !== null && _a !== void 0 ? _a : null,
        };
        const hotel = await hotelRepository_1.hotelRepository.create(payload);
        res.status(201).json(hotel);
    },
    async updateHotel(req, res) {
        var _a;
        const id = Number(req.params.id);
        const existing = await hotelRepository_1.hotelRepository.findById(id);
        if (!existing) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const parseResult = hotelSchema_1.updateHotelSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.format() });
        }
        const payload = {};
        if (parseResult.data.name !== undefined)
            payload.name = parseResult.data.name;
        if (parseResult.data.location !== undefined)
            payload.location = parseResult.data.location;
        if (parseResult.data.availableRooms !== undefined) {
            payload.availableRooms = parseResult.data.availableRooms;
        }
        if (parseResult.data.pricePerNight !== undefined) {
            payload.pricePerNight = parseResult.data.pricePerNight;
        }
        if (parseResult.data.rating !== undefined)
            payload.rating = parseResult.data.rating;
        if (parseResult.data.description !== undefined) {
            payload.description = (_a = parseResult.data.description) !== null && _a !== void 0 ? _a : null;
        }
        const hotel = await hotelRepository_1.hotelRepository.update(id, payload);
        res.json(hotel);
    },
    async deleteHotel(req, res) {
        const id = Number(req.params.id);
        const deleted = await hotelRepository_1.hotelRepository.remove(id);
        if (!deleted) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(204).send();
    },
};
//# sourceMappingURL=hotelController.js.map