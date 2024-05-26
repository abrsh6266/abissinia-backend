import mongoose, { Document, Schema } from 'mongoose';

export interface IShowTime {
  day: string;
  time: string[];
}

export interface IMovieShow extends Document {
  createdAt: Date;
  showTime: IShowTime[];
  movieId: mongoose.Types.ObjectId;
  hallId: mongoose.Types.ObjectId;
}

const movieShowSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  showTime: [
    {
      day: { type: String, required: true },
      time: [{ type: String, required: true }],
    },
  ],
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  hallId: { type: Schema.Types.ObjectId, ref: 'Hall', required: true },
});

export default mongoose.model<IMovieShow>('MovieShow', movieShowSchema);