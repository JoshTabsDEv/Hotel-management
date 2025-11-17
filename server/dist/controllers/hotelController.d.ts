import { Request, Response } from "express";
export declare const hotelController: {
    getHotels(req: Request, res: Response): Promise<void>;
    getHotelById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createHotel(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateHotel(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteHotel(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=hotelController.d.ts.map