import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { HotelPayload } from "../types/hotel";

type HotelFormProps = {
  initialValues?: HotelPayload;
  onSubmit: (data: HotelPayload) => Promise<void> | void;
  onCancel?: () => void;
  submitting?: boolean;
};

const defaultValues: HotelPayload = {
  name: "",
  location: "",
  availableRooms: 0,
  pricePerNight: 0,
  rating: 0,
  description: "",
};

export function HotelForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting = false,
}: HotelFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HotelPayload>({
    defaultValues,
  });

  useEffect(() => {
    reset(initialValues ?? defaultValues);
  }, [initialValues, reset]);

  return (
    <form
      className="panel"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          availableRooms: Number(values.availableRooms),
          pricePerNight: Number(values.pricePerNight),
          rating: Number(values.rating),
        });
        if (!initialValues) {
          reset(defaultValues);
        }
      })}
    >
      <h2>{initialValues ? "Edit hotel" : "Add new hotel"}</h2>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Hotel California"
          />
          {errors.name && <small>{errors.name.message}</small>}
        </label>
        <label>
          <span>Location</span>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Los Angeles"
          />
          {errors.location && <small>{errors.location.message}</small>}
        </label>
        <label>
          <span>Available rooms</span>
          <input
            type="number"
            min={0}
            {...register("availableRooms", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be positive" },
            })}
          />
          {errors.availableRooms && <small>{errors.availableRooms.message}</small>}
        </label>
        <label>
          <span>Price per night (USD)</span>
          <input
            type="number"
            min={0}
            step="0.01"
            {...register("pricePerNight", {
              valueAsNumber: true,
              min: { value: 0, message: "Must be positive" },
            })}
          />
          {errors.pricePerNight && <small>{errors.pricePerNight.message}</small>}
        </label>
        <label>
          <span>Rating</span>
          <input
            type="number"
            min={0}
            max={5}
            step="0.1"
            {...register("rating", {
              valueAsNumber: true,
              min: { value: 0, message: "Min rating is 0" },
              max: { value: 5, message: "Max rating is 5" },
            })}
          />
          {errors.rating && <small>{errors.rating.message}</small>}
        </label>
        <label className="full-width">
          <span>Description</span>
          <textarea
            rows={3}
            {...register("description")}
            placeholder="Highlights, amenities, etc."
          />
        </label>
      </div>
      <div className="actions">
        {onCancel && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initialValues ? "Save changes" : "Create hotel"}
        </button>
      </div>
    </form>
  );
}
