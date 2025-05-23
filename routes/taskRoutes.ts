import { Router } from "express";
import { registerTask, getAllTasks, updateTask } from "../controllers/taskController.ts";

const router = Router();

router.post("/register", registerTask);
router.get("/", getAllTasks);
router.put("/update/:id", updateTask);  

export default router;
