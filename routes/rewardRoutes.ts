import { Router } from "express";
import { createReward, updateReward, deleteReward, getAllRewards } from "../controllers/RewardController.ts";

const router = Router();

router.post("/createReward", createReward);
router.post("/updateReward", updateReward);
router.post("/deleteReward", deleteReward);

router.get("/", getAllRewards);

export default router;