"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
}, {
    _id: false,
});
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    softPrice: { type: Number, required: true },
    hardPrice: { type: Number, required: true },
    details: { type: String, required: true },
    // ✅ Newly added fields
    copyType: {
        type: String,
        enum: ["Hardcopy", "Softcopy"],
        required: true,
    },
    category: {
        type: String,
        enum: ["Academic", "Technology", "Business"],
        required: true,
    },
    language: {
        type: String,
        enum: ["English", "Bangla"],
        required: true,
    },
    publishedDate: { type: Date },
    stock: { type: Number, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
//# sourceMappingURL=book.model.js.map