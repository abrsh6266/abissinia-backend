import mongoose, { Document, Schema } from "mongoose";

interface IMovieRequest extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  duration: number;
  releaseDate: Date;
  posterURL: string;
  description: string;
  yourName: string;
  yourEmail: string;
}

const movieRequestSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    posterURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    yourName: {
      type: String,
      required: true,
    },
    yourEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMovieRequest>(
  "MovieRequest",
  movieRequestSchema
);
