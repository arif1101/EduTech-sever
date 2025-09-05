import { Router } from "express"
import { UserControllers } from "./user.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "./user.interface"




const router = Router()

router.post("/register", UserControllers.createUser)
router.get('/me', checkAuth(...Object.values(Role)),UserControllers.getMyProfile);
router.patch('/update', checkAuth(...Object.values(Role)) ,UserControllers.updateUser);

export const UserRoutes = router