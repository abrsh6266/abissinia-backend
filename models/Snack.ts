import mongoose, { Document, Schema } from 'mongoose';

export interface ISnack extends Document {
  type: string;
  name: string;
  image: string;
  price: number;
}

const SnackSchema: Schema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<ISnack>('Snack', SnackSchema);
