import { Router } from "express";
import { linkFamilyMember } from "../controllers/familyController.ts";

const router = Router();

router.post("/add/:parentId", linkFamilyMember);

export default router;
