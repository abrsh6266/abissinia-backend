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
  shows: mongoose.Types.ObjectId[]; // Add this line to reference MovieShow
}

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  duration: { type: String },
  genre: [{ type: String, required: true }],
  country: { type: String, required: true },
  starsId: [{ type: Schema.Types.ObjectId, ref: "Star", required: true }],
  releaseDate: { type: Date, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  reviewId: [{ type: Schema.Types.ObjectId, ref: "Review", required: true }],
  shows: [{ type: Schema.Types.ObjectId, ref: "MovieShow" }], // Add this line to reference MovieShow
});

export default mongoose.model<IMovie>("Movie", movieSchema);
