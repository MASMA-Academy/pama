import { Request, Response } from "express";
import { pool } from "../db.ts";

let users: any[] = [];

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let client;
  try {
    client = await pool.connect();

    // Optional: Check if email already exists
    const check = await client.queryObject<{ count: number }>(
      "SELECT COUNT(*)::int FROM users WHERE email = $1",
      [email]
    );
    if (check.rows[0].count > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Insert new user
    const result = await client.queryObject(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, password]
    );

    const userId = (result.rows[0] as any).id;

    return res.status(201).json({
      message: "User registered",
      user: { id: userId, name, email },
    });

  } catch (error) {
    return res.status(500).json({ message: "DB error", error: error.message });
  } finally {
    client?.release();
  }
};


export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.status(200).json({ message: "Login successful", user });
};


export const getAllUsers = (_req: Request, res: Response) => {
  res.status(200).json({ users });
};

