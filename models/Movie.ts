import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  title: string;
  duration?: string;
  genre: string;
  country: string;
  starsId: mongoose.Types.ObjectId[];
  releaseDate: Date;
  description: string;
  poster: string;
  reviewId: mongoose.Types.ObjectId[];
  averageRating: number;
}

const movieSchema: Schema = new Schema({
  averageRating: { type: Number, default: 0 },
  title: { type: String, required: true },
  duration: { type: String },
  genre: [{ type: String, required: true }],
  country: { type: String, required: true },
  starsId: [{ type: Schema.Types.ObjectId, ref: "Star", required: true }],
  releaseDate: { type: Date, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  reviewId: [{ type: Schema.Types.ObjectId, ref: "Review", required: true }],
});

export default mongoose.model<IMovie>("Movie", movieSchema);
