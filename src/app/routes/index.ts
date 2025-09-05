import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CourseRoutes } from "../modules/course/course.route";



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
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})