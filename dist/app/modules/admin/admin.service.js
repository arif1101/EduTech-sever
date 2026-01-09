"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const course_model_1 = require("../course/course.model");
const book_model_1 = require("../book/book.model");
const user_model_1 = require("../user/user.model");
const payment_model_1 = require("../payment/payment.model");
const getDashboardData = async () => {
    /* ======================
       STAT CARDS
    ======================= */
    const [totalCourses, totalBooks, totalUsers, completedPayments,] = await Promise.all([
        course_model_1.Course.countDocuments(),
        book_model_1.Book.countDocuments(),
        user_model_1.User.countDocuments({ role: "USER" }),
        payment_model_1.Payment.find({ status: "completed" }),
    ]);
    const totalRevenue = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const enrolledStudents = completedPayments.reduce((sum, payment) => sum + payment.courses.length, 0);
    const avgCourseRatingAgg = await course_model_1.Course.aggregate([
        {
            $group: {
                _id: null,
                avgRating: { $avg: "$averageRating" },
            },
        },
    ]);
    const avgCourseRating = avgCourseRatingAgg[0]?.avgRating || 0;
    /* ======================
       ENROLLMENT TREND (MONTHLY)
    ======================= */
    const enrollmentTrend = await payment_model_1.Payment.aggregate([
        { $match: { status: "completed" } },
        { $unwind: "$courses" },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                enrolled: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    /* ======================
       COURSE POPULARITY
    ======================= */
    const coursePopularity = await payment_model_1.Payment.aggregate([
        { $match: { status: "completed" } },
        { $unwind: "$courses" },
        {
            $group: {
                _id: "$courses",
                total: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "course",
            },
        },
        { $unwind: "$course" },
        {
            $project: {
                _id: 0,
                name: "$course.title",
                value: "$total",
            },
        },
        { $sort: { value: -1 } },
        { $limit: 5 },
    ]);
    /* ======================
       FINAL RESPONSE SHAPE
    ======================= */
    return {
        stats: {
            activeCourses: totalCourses,
            totalRevenue,
            enrolledStudents,
            totalBooks,
            avgCourseRating: Number(avgCourseRating.toFixed(2)),
            totalStudents: totalUsers,
        },
        charts: {
            enrollmentTrend,
            coursePopularity,
        },
    };
};
exports.AdminService = {
    getDashboardData,
};
//# sourceMappingURL=admin.service.js.map