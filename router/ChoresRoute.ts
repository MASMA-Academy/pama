import { Router } from 'express';
import { getAllChores } from "../controllers/ChoresController.ts";  


const choresRouter = Router();

// Define a route to get all users
choresRouter.get('/', getAllChores);

export { choresRouter };
