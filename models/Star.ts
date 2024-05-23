import mongoose, { Document, Schema } from 'mongoose';

export interface IStar extends Document {
  name: string;
  address: {
    email: string;
    phone?: string;
    website?: string;
  };
  profilePhoto: string;
}

const StarSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: {
    email: { type: String, required: true },
    phone: { type: String },
    website: { type: String },
  },
  profilePhoto: { type: String, required: true },
});

export default mongoose.model<IStar>('Star', StarSchema);
