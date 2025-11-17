import { Router } from "express";
import { hotelController } from "../controllers/hotelController";

const router = Router();

router.get("/", hotelController.getHotels);
router.get("/:id", hotelController.getHotelById);
router.post("/", hotelController.createHotel);
router.put("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);

export default router;
