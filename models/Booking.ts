import mongoose, { Document, Schema } from "mongoose";
import { SeatType } from "./Hall";

export interface IBooking extends Document {
  bookingDate: Date;
  userId: mongoose.Types.ObjectId;
  movieShowId: mongoose.Types.ObjectId;
  order?: mongoose.Types.ObjectId;
  seats: {
    booked: SeatType[];
  };
  price: number;
}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>({
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieShowId: {
    type: Schema.Types.ObjectId,
    ref: "MovieShow",
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  seats: {
    booked: [
      {
        seatNumber: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IBooking>("Booking", bookingSchema);
