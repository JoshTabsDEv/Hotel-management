import type { Hotel } from "../types/hotel";

type HotelListProps = {
  hotels: Hotel[];
  loading?: boolean;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
};

export function HotelList({
  hotels,
  loading = false,
  onEdit,
  onDelete,
}: HotelListProps) {
  if (loading) {
    return <div className="panel centered">Loading hotels...</div>;
  }

  if (hotels.length === 0) {
    return (
      <div className="panel centered">
        <p>No hotels match your filters yet.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Rooms</th>
              <th>Price / night</th>
              <th>Rating</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>
                  <strong>{hotel.name}</strong>
                  <br />
                  <small>{new Date(hotel.updatedAt).toLocaleString()}</small>
                </td>
                <td>{hotel.location}</td>
                <td>{hotel.availableRooms}</td>
                <td>${hotel.pricePerNight.toFixed(2)}</td>
                <td>{hotel.rating.toFixed(1)}</td>
                <td className="description">{hotel.description ?? "—"}</td>
                <td className="actions-col">
                  <button className="ghost" onClick={() => onEdit(hotel)}>
                    Edit
                  </button>
                  <button className="danger ghost" onClick={() => onDelete(hotel)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
