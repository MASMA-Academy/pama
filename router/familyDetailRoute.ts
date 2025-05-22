// routes/familyDetailRoute.ts

import { Router } from 'express';
import { getFamilyDetails } from '../controllers/familyDetailController.ts';

const familyDetailRouter = Router();

// Example family detail route
familyDetailRouter.get('/', getFamilyDetails);

export { familyDetailRouter };
