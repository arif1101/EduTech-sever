"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
// enrollment.service.ts
const payment_model_1 = require("../payment/payment.model");
const getMyEnrollments = async (userId) => {
    const enrollments = await payment_model_1.Payment.find({
        user: userId,
        status: "completed",
    })
        .populate({
        path: "courses",
        select: "title thumbnail instructor price description",
    })
        .sort({ createdAt: -1 });
    return enrollments;
};
exports.EnrollmentService = {
    getMyEnrollments,
};
//# sourceMappingURL=enrollment.service.js.map