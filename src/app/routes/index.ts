import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CourseRoutes } from "../modules/course/course.route";
import { BookRoutes } from "../modules/book/book.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { CartCourseRoutes } from "../modules/cart/cart.course.route";
import { SectionRoutes } from "../modules/section/section.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { EnrollmentRoutes } from "../modules/enrollment/enrollment.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { ReviewRoutes } from "../modules/review/review.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/courses",
    router: CourseRoutes,
  },
  {
    path: "/sections",
    router: SectionRoutes,
  },
  {
    path: "/lessons",
    router: LessonRoutes,
  },
  {
    path: "/book",
    router: BookRoutes,
  },
  {
    path: "/cart",
    router: CartCourseRoutes,
  },
  {
    path: "/cart",
    router: CartRoutes,
  },
  {
    path: "/payment",
    router: PaymentRoutes,
  },
  {
    path: "/enrollment",
    router: EnrollmentRoutes,
  },
  {
    path: "/admin",
    router: AdminRoutes,
  },
  {
    path: "/reviews",
    router: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});
