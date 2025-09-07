import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { CartController } from "./cart.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/book/add", checkAuth(...Object.values(Role)), CartController.addToCart);
router.get("/book/me", checkAuth(...Object.values(Role)), CartController.getUserCart);
router.delete("/book/remove/:bookId", checkAuth(...Object.values(Role)), CartController.removeFromCart);
router.patch("/book/update", checkAuth(...Object.values(Role)), CartController.updateCart);

export const CartRoutes = router;