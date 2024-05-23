import mongoose, { Document, Schema } from 'mongoose';

export interface SeatType {
  seatNumber: number;
}

export interface IHall extends Document {
  name: string;
  address?: {
    map?: string;
  };
  seats: {
    sofa: SeatType[];
    standard: SeatType[];
    premier: SeatType[];
  };
}

const hallSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: {
    map: { type: String },
  },
  seats: {
    sofa: [{ seatNumber: { type: Number, required: true } }],
    standard: [{ seatNumber: { type: Number, required: true } }],
    premier: [{ seatNumber: { type: Number, required: true } }],
  },
});

export default mongoose.model<IHall>('Hall', hallSchema);
