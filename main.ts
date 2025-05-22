import express from "express";
import { pool } from "./db.ts";
import userRouter from "./routes/userRoutes.ts";
import taskRouter from "./routes/taskRoutes.ts";
import { join, dirname, fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";

const app = express();
app.use(express.json());

const __dirname = dirname(fromFileUrl(import.meta.url));

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));

// Home route - serve login page
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "login.html"));
});

//REGISTER route
app.use("/users", userRouter);

//TASK route
app.use("/tasks", taskRouter);

// Optional: test DB connection route
app.get("/db-test", async (_req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject("SELECT NOW() AS now");
    res.json({ dbTime: result.rows[0] });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: "Database connection error", details: errorMessage });
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
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("DB Connection failed:", errorMessage);
  } finally {
    client?.release();
  }
}
testDbConnection();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
