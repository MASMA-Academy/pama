import express from "express";
import { pool } from "./db.ts";
import userRouter from "./routes/userRoutes.ts";

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the PAMA - House Chore API!");
});

app.use("/users", userRouter);

// Optional: test DB connection route
app.get("/db-test", async (_req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject("SELECT NOW() AS now");
    res.json({ dbTime: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Database connection error", details: err.message });
  } finally {
    client?.release();
  }
});

// Initial DB test when server starts
async function testDbConnection() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject("SELECT NOW()");
    console.log("DB Connection successful! Current time:", result.rows[0]);
  } catch (error) {
    console.error("DB Connection failed:", error.message);
  } finally {
    client?.release();
  }
}
testDbConnection();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
