"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const course_route_1 = require("../modules/course/course.route");
const book_route_1 = require("../modules/book/book.route");
const cart_route_1 = require("../modules/cart/cart.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        router: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        router: auth_route_1.AuthRoutes
    },
    {
        path: "/course",
        router: course_route_1.CourseRoutes
    },
    {
        path: "/book",
        router: book_route_1.BookRoutes
    },
    {
        path: "/cart",
        router: cart_route_1.CartRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.router);
});
//# sourceMappingURL=index.js.map