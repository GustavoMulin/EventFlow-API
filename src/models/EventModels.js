import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: String, required: true },
  price: Number,
  image: String,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: false
  }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
