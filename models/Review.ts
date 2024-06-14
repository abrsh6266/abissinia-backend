import mongoose, { Document, Schema } from "mongoose";
import { updateAverageRating } from "../controllers/admin/movieController";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  rating?: number;
  comment?: string;
  date: Date;
}

// Schema definition
const reviewSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

// Hook for when a review is saved
reviewSchema.post("save", function (doc:any) {
  updateAverageRating(doc.movieId);
});

// Hook for when a review is updated
reviewSchema.post("findOneAndUpdate", async function () {
  const doc = await this.model.findOne(this.getQuery());
  updateAverageRating(doc.movieId);
});

// Hook for when a review is deleted
reviewSchema.post("findOneAndDelete", function (doc) {
  updateAverageRating(doc.movieId);
});

export default mongoose.model<IReview>("Review", reviewSchema);
