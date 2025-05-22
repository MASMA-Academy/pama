import { Request, Response } from "express";

let users: any[] = [];
let userId = 1;

export const registerUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newUser = {
    id: userId++,
    name,
    email,
    password,
  };

  users.push(newUser);
  return res.status(201).json({ message: "User registered", user: newUser });
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

