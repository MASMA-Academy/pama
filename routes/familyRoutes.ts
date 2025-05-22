import { Router } from "express";
import { linkFamilyMember } from "../controllers/familyController.ts";

const router = Router();

router.post("/users/:parentId/add-family", linkFamilyMember);

export default router;
