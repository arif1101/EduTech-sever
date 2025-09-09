"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCart = void 0;
// courseCart.model.ts
const mongoose_1 = require("mongoose");
const CourseCartItemSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String },
}, { _id: false });
const CourseCartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [CourseCartItemSchema], default: [] },
    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });
CourseCartSchema.pre("save", function (next) {
    this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
    next();
});
exports.CourseCart = (0, mongoose_1.model)("CourseCart", CourseCartSchema);
//# sourceMappingURL=cart.course.model.js.map