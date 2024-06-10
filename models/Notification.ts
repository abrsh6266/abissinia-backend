import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  content: string;
  seen: boolean;
  date: Date;
  userId: mongoose.Types.ObjectId;
}

const notificationSchema: Schema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  link: { type: String, default: "#" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
