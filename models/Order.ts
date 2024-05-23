import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  snacks: { snackId: mongoose.Types.ObjectId; quantity: number }[];
  movieId: mongoose.Types.ObjectId;
  date: Date;
  price: number;
}

const orderSchema: Schema = new Schema({
  snacks: [
    {
      snackId: { type: Schema.Types.ObjectId, ref: "Snack", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true },
});

export default mongoose.model<IOrder>("Order", orderSchema);
