import { Request, Response } from "express";
import { pool } from "../db.ts";

// REGISTER TASK
export const registerTask = async (req: Request, res: Response) => {
  const { title, description, assigned_to, status, parent_id } = req.body;

  if (!title || !assigned_to || !status || !parent_id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let client;
  try {
    client = await pool.connect();

    const linkCheck = await client.queryObject(
      "SELECT * FROM familyMembers WHERE parent_id = $1 AND member_id = $2",
      [parent_id, assigned_to]
    );

    if (linkCheck.rows.length === 0) {
      return res.status(403).json({
        message: "Assigned member is not linked to this parent",
      });
    }

    const result = await client.queryObject(
      "INSERT INTO tasks (title, description, assigned_to, status, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [title, description, assigned_to, status, parent_id]
    );

    const taskId = (result.rows[0] as any).id;

    return res.status(201).json({
      message: "Task registered",
      task: { id: taskId, title, description, assigned_to, status, parent_id },
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message: "Error creating task", error: errorMessage });
  } finally {
    client?.release();
  }
};

// GET ALL TASKS
export const getAllTasks = async (_req: Request, res: Response) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(
      "SELECT id, title, description, assigned_to, status, parent_id FROM tasks"
    );
    res.status(200).json({ tasks: result.rows });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message: "DB Error", error: errorMessage });
  } finally {
    client?.release();
  }
};

// UPDATE TASK
export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { title, description, assigned_to, status, parent_id } = req.body;

  if (!title || !assigned_to || !status || !parent_id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let client;
  try {
    client = await pool.connect();

    const linkCheck = await client.queryObject(
      "SELECT * FROM familyMembers WHERE parent_id = $1 AND member_id = $2",
      [parent_id, assigned_to]
    );

    if (linkCheck.rows.length === 0) {
      return res.status(403).json({
        message: "Assigned member is not linked to this parent",
      });
    }

    const result = await client.queryObject(
      "UPDATE tasks SET title = $1, description = $2, assigned_to = $3, status = $4 WHERE id = $5 RETURNING *",
      [title, description, assigned_to, status, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task updated", task: result.rows[0] });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message: "Error updating task", error: errorMessage });
  } finally {
    client?.release();
  }
};
