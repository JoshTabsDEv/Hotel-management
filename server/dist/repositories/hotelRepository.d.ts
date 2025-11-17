import { Hotel, HotelFilters, NewHotel } from "../types/hotel";
export declare const hotelRepository: {
    findAll(filters?: HotelFilters): Promise<Hotel[]>;
    findById(id: number): Promise<Hotel | null>;
    create(data: NewHotel): Promise<Hotel>;
    update(id: number, data: Partial<NewHotel>): Promise<Hotel | null>;
    remove(id: number): Promise<boolean>;
};
//# sourceMappingURL=hotelRepository.d.ts.map