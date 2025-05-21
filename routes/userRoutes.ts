import { Router } from "express";
import { registerUser, getAllUsers, loginUser } from "../controllers/userController.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", getAllUsers);

export default router;
