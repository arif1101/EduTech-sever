"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const course_route_1 = require("../modules/course/course.route");
const book_route_1 = require("../modules/book/book.route");
const cart_route_1 = require("../modules/cart/cart.route");
const cart_course_route_1 = require("../modules/cart/cart.course.route");
const section_route_1 = require("../modules/section/section.route");
const lesson_route_1 = require("../modules/lesson/lesson.route");
const payment_route_1 = require("../modules/payment/payment.route");
const enrollment_routes_1 = require("../modules/enrollment/enrollment.routes");
const admin_route_1 = require("../modules/admin/admin.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        router: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        router: auth_route_1.AuthRoutes,
    },
    {
        path: "/courses",
        router: course_route_1.CourseRoutes,
    },
    {
        path: "/sections",
        router: section_route_1.SectionRoutes,
    },
    {
        path: "/lessons",
        router: lesson_route_1.LessonRoutes,
    },
    {
        path: "/book",
        router: book_route_1.BookRoutes,
    },
    {
        path: "/cart",
        router: cart_course_route_1.CartCourseRoutes,
    },
    {
        path: "/cart",
        router: cart_route_1.CartRoutes,
    },
    {
        path: "/payment",
        router: payment_route_1.PaymentRoutes,
    },
    {
        path: "/enrollment",
        router: enrollment_routes_1.EnrollmentRoutes,
    },
    {
        path: "/admin",
        router: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.router);
});
//# sourceMappingURL=index.js.map