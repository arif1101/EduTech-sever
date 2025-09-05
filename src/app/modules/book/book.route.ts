import { Router } from "express"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import { BookController } from "./book.controller"

const router = Router()

router.post("/create",checkAuth(Role.ADMIN),BookController.createBook)
router.get("/", BookController.getAllBooks);

export const BookRoutes = router