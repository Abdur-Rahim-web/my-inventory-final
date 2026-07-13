import mongoose, { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    fullDesc: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

const Item = models.Item || model("Item", itemSchema);
export default Item;