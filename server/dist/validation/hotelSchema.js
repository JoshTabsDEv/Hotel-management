"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHotelSchema = exports.createHotelSchema = void 0;
const zod_1 = require("zod");
exports.createHotelSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(120),
    location: zod_1.z.string().min(2).max(120),
    availableRooms: zod_1.z.number().int().min(0),
    pricePerNight: zod_1.z.number().min(0),
    rating: zod_1.z.number().min(0).max(5),
    description: zod_1.z.string().max(500).optional().nullable(),
});
exports.updateHotelSchema = exports.createHotelSchema.partial();
//# sourceMappingURL=hotelSchema.js.map