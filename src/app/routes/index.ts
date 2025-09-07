import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CourseRoutes } from "../modules/course/course.route";
import { BookRoutes } from "../modules/book/book.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { CartCourseRoutes } from "../modules/cart/cart.course.route";



export const router = Router()

const moduleRoutes =[
    {
        path: "/user",
        router: UserRoutes
    },
    {
        path: "/auth",
        router: AuthRoutes
    },
    {
        path: "/course",
        router: CourseRoutes
    },
    {
        path: "/book",
        router: BookRoutes
    },
    {
        path: "/cart",
        router: CartCourseRoutes
    },
    {
        path: "/cart",
        router: CartRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})