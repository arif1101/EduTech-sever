// enrollment.service.ts
import { Payment } from "../payment/payment.model";

const getMyEnrollments = async (userId: string) => {
  const enrollments = await Payment.find({
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

export const EnrollmentService = {
  getMyEnrollments,
};