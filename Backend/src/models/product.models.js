import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        rating: {
            rate: {
                type: Number,
                required: true,
            },
            count: {
                type: Number,
                required: true,
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { timestamps: true }
);
