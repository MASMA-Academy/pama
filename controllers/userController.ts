import { Request, Response } from "express";
import { pool } from "../db.ts";

// REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, gender, age, role } = req.body;

  if (!name || !email || !password || !gender || !age || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let client;
  try {
    client = await pool.connect();

    const check = await client.queryObject<{ count: number }>(
      "SELECT COUNT(*)::int FROM users WHERE email = $1",
      [email]
    );
    if (check.rows[0].count > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const result = await client.queryObject(
      "INSERT INTO users (name, email, password, gender, age, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [name, email, password, gender, age, role]
    );

    const userId = (result.rows[0] as any).id;

    return res.status(201).json({
      message: "User registered",
      user: { id: userId, name, email, password, gender, age, role },
    });
  } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: "User Registered Failed", error: errorMessage });
  } finally {
    client?.release();
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(
      "SELECT id, name, email, role FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result.rows[0];
    res.status(200).json({ message: "Login successful", user });

  } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: "DB Error", error: errorMessage });
  } finally {
    client?.release();
  }
};


// GET ALL USERS
export const getAllUsers = async (_req: Request, res: Response) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(
      "SELECT id, name, email FROM users"
    );
    res.status(200).json({ users: result.rows });
  } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: "DB Error", error: errorMessage });
  } finally {
    client?.release();
  }
};
