import { Request, Response } from 'express';
import { getChores, Chores } from '../models/chores.ts'; // Adjust the import path as needed

// GET /chores - Fetch all chores
export const getAllChores = (req: Request, res: Response) => {
    const chores: Chores[] = getChores();
    res.status(200).json(chores);
};

// Future: POST /chores - Add a new chore
export const addChore = (req: Request, res: Response) => {
    const { title, description, assignedTo } = req.body;

    if (!title || !description || !assignedTo) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Normally you would save to a database, but we'll just simulate it
    const newChore: Chores = {
        id: Math.floor(Math.random() * 10000), // Simulated ID
        title,
        description,
        assignedTo,
    };

    res.status(201).json(newChore);
};
