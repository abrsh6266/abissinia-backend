import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  rating?: number;
  comment?: string;
  date: Date;
}

const reviewSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', reviewSchema);
