import { Request, Response } from "express";
import { pool } from "../db.ts";

// REGISTER TASK
export const registerTask = async (req: Request, res: Response) => {
  const { title, description, assigned_to, status } = req.body;

  if (!title || !description || !assigned_to || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let chores;
  try {
    chores = await pool.connect();

    const result = await chores.queryObject(
      "INSERT INTO task (title, description, assigned_to, status) VALUES ($1, $2, $3, $4) RETURNING id",
      [title, description, assigned_to, status]
    );

    const taskId = (result.rows[0] as any).id;

    return res.status(201).json({
      message: "Task registered",
      user: { id: taskId, title, description, assigned_to, status },
    });

  } catch (error) {
    return res.status(500).json({ message: "DB error", error: error.message });
  } finally {
    chores?.release();
  }
};

// GET ALL TASK
export const getAllTasks = async (_req: Request, res: Response) => {
  let chores;
  try {
    chores = await pool.connect();
    const result = await chores.queryObject(
      "SELECT id, title, description, assigned_to, status FROM task"
    );
    res.status(200).json({ task: result.rows });
  } catch (error) {
    return res.status(500).json({ message: "DB error", error: error.message });
  } finally {
    chores?.release();
  }
};
