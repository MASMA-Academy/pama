import { Router } from "express";
import { registerTask, getAllTasks } from "../controllers/taskController.ts";

const router = Router();

router.post("/register", registerTask);

router.get("/", getAllTasks);

export default router;
