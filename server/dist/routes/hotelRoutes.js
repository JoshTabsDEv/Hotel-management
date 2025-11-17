"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelController_1 = require("../controllers/hotelController");
const router = (0, express_1.Router)();
router.get("/", hotelController_1.hotelController.getHotels);
router.get("/:id", hotelController_1.hotelController.getHotelById);
router.post("/", hotelController_1.hotelController.createHotel);
router.put("/:id", hotelController_1.hotelController.updateHotel);
router.delete("/:id", hotelController_1.hotelController.deleteHotel);
exports.default = router;
//# sourceMappingURL=hotelRoutes.js.map