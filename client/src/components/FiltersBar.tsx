import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { HotelFilters } from "../types/hotel";

type FiltersBarProps = {
  value: HotelFilters;
  onChange: (filters: HotelFilters) => void;
};

export function FiltersBar({ value, onChange }: FiltersBarProps) {
  const [local, setLocal] = useState({
    location: value.location ?? "",
    minPrice: value.minPrice?.toString() ?? "",
    maxPrice: value.maxPrice?.toString() ?? "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing form inputs with incoming filter props
    setLocal({
      location: value.location ?? "",
      minPrice: value.minPrice?.toString() ?? "",
      maxPrice: value.maxPrice?.toString() ?? "",
    });
  }, [value.location, value.maxPrice, value.minPrice]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onChange({
      location: local.location.trim() || undefined,
      minPrice: local.minPrice ? Number(local.minPrice) : undefined,
      maxPrice: local.maxPrice ? Number(local.maxPrice) : undefined,
    });
  };

  const handleReset = () => {
    const resetState = { location: "", minPrice: "", maxPrice: "" };
    setLocal(resetState);
    onChange({});
  };

  return (
    <form className="panel filters" onSubmit={handleSubmit}>
      <label>
        <span>Location</span>
        <input
          value={local.location}
          onChange={(event) => setLocal((prev) => ({ ...prev, location: event.target.value }))}
          placeholder="Search by city"
        />
      </label>
      <label>
        <span>Min price</span>
        <input
          type="number"
          min={0}
          value={local.minPrice}
          onChange={(event) => setLocal((prev) => ({ ...prev, minPrice: event.target.value }))}
        />
      </label>
      <label>
        <span>Max price</span>
        <input
          type="number"
          min={0}
          value={local.maxPrice}
          onChange={(event) => setLocal((prev) => ({ ...prev, maxPrice: event.target.value }))}
        />
      </label>
      <div className="filters-actions">
        <button type="submit">Apply</button>
        <button type="button" className="ghost" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
