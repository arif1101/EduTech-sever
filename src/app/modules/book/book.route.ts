import { Router } from "express"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import { BookController } from "./book.controller"

const router = Router()

router.post("/create",checkAuth(Role.ADMIN),BookController.createBook)
router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getSinglebook);

export const BookRoutes = router