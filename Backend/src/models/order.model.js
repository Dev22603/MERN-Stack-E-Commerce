import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
	productID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
	},
	quantity: {
		type: Number,
		required: true,
	},
});
const orderSchema = new mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		orderItems: {
			type: [orderItemSchema],
		},
		status: {
			type: String,
			enum: ["PENDING", "CANCELLED", "DELIVERED"],
			default: "PENDING",
		},
	},
	{ timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
