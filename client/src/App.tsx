import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { FiltersBar } from "./components/FiltersBar";
import { HotelForm } from "./components/HotelForm";
import { HotelList } from "./components/HotelList";
import { hotelApi } from "./services/hotelApi";
import type { Hotel, HotelFilters, HotelPayload } from "./types/hotel";

function App() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filters, setFilters] = useState<HotelFilters>({});
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedHotelPayload = useMemo<HotelPayload | undefined>(() => {
    if (!selectedHotel) return undefined;
    return {
      name: selectedHotel.name,
      location: selectedHotel.location,
      availableRooms: selectedHotel.availableRooms,
      pricePerNight: selectedHotel.pricePerNight,
      rating: selectedHotel.rating,
      description: selectedHotel.description ?? "",
    };
  }, [selectedHotel]);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await hotelApi.list(filters);
      setHotels(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong while loading hotels",
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadHotels();
  }, [loadHotels]);

  const handleSubmit = async (payload: HotelPayload) => {
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      if (selectedHotel) {
        const updated = await hotelApi.update(selectedHotel.id, payload);
        setHotels((prev) => prev.map((hotel) => (hotel.id === updated.id ? updated : hotel)));
        setFeedback("Hotel updated successfully");
      } else {
        const created = await hotelApi.create(payload);
        setHotels((prev) => [created, ...prev]);
        setFeedback("Hotel created successfully");
      }
      setSelectedHotel(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save hotel. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (hotel: Hotel) => {
    const confirmed = window.confirm(`Delete ${hotel.name}? This cannot be undone.`);
    if (!confirmed) return;
    setError(null);
    setFeedback(null);
    try {
      await hotelApi.remove(hotel.id);
      setHotels((prev) => prev.filter((item) => item.id !== hotel.id));
      setFeedback("Hotel deleted");
      if (selectedHotel?.id === hotel.id) {
        setSelectedHotel(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete hotel. Please try again.",
      );
    }
  };

  return (
    <div className="app">
      <header>
        <div>
          <p className="eyebrow">Operations console</p>
          <h1>Hotel management</h1>
          <p>Track inventory, pricing, and ratings for every property in one place.</p>
        </div>
        <button className="ghost" onClick={() => loadHotels()}>
          Refresh
        </button>
      </header>

      {error && (
        <div className="banner error">
          <strong>Heads up:</strong> {error}
        </div>
      )}
      {feedback && <div className="banner success">{feedback}</div>}

      <FiltersBar value={filters} onChange={setFilters} />

      <div className="layout">
        <HotelForm
          initialValues={selectedHotelPayload}
          onSubmit={handleSubmit}
          submitting={saving}
          onCancel={selectedHotel ? () => setSelectedHotel(null) : undefined}
        />

        <HotelList
          hotels={hotels}
          loading={loading}
          onEdit={setSelectedHotel}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
