import { Course } from "../course/course.model";
import { Book } from "../book/book.model";
import { User } from "../user/user.model";
import { Payment } from "../payment/payment.model";

const getDashboardData = async () => {
  /* ======================
     STAT CARDS
  ======================= */

  const [
    totalCourses,
    totalBooks,
    totalUsers,
    completedPayments,
  ] = await Promise.all([
    Course.countDocuments(),
    Book.countDocuments(),
    User.countDocuments({ role: "USER" }),
    Payment.find({ status: "completed" }),
  ]);

  const totalRevenue = completedPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const enrolledStudents = completedPayments.reduce(
    (sum, payment) => sum + payment.courses.length,
    0
  );

  const avgCourseRatingAgg = await Course.aggregate([
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

  const enrollmentTrend = await Payment.aggregate([
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

  const coursePopularity = await Payment.aggregate([
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

export const AdminService = {
  getDashboardData,
};
