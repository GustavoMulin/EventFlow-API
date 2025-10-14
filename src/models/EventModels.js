import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: String, required: true },
  time: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  image: String,
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
