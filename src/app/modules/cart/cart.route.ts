import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { CartController } from "./cart.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/add", checkAuth(...Object.values(Role)), CartController.addToCart);
router.get("/me", checkAuth(...Object.values(Role)), CartController.getUserCart);
router.delete("/remove/:bookId", checkAuth(...Object.values(Role)), CartController.removeFromCart);
router.patch("/update", checkAuth(...Object.values(Role)), CartController.updateCart);

export const CartRoutes = router;