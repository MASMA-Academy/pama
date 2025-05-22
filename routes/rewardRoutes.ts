import { Router } from "express";
import { createReward, updateReward, deleteReward, getAllRewards } from "../controllers/rewardController.ts";

const router = Router();

router.post("/create", createReward);
router.post("/update", updateReward);
router.post("/delete", deleteReward);

router.get("/", getAllRewards);

export default router;