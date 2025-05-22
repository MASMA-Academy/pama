// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import { pool } from "./db.ts";
import userRouter from "./routes/userRoutes.ts";

const env = await load();

const pool = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  hostname: env.DB_HOST,
  port: Number(env.DB_PORT),
  tls: {
    enabled: true,
    enforce: false,
  },
}, 3, true);

async function testDbConnection() {
  let client;
  try {
    client = await pool.connect();  // Acquire client from pool
    const result = await client.queryObject("SELECT NOW()");
    console.log("✅ DB Connection successful! Current time:", result.rows[0]);
  } catch (error) {
    // Use error.message, pool has no .message
    console.error("❌ DB Connection failed:", error.message);
  } finally {
    if (client) client.release();  // Release client back to pool
  }
}

// Test DB connection on server start
testDbConnection();

const app = express();
app.use(express.json());

const __dirname = dirname(fromFileUrl(import.meta.url));

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));

// Home route - serve login page
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "login.html"));
});

// Details route
app.get("/details", (req, res) => {
  res.send(details);
});

app.use("/users", userRouter);
app.use("/rewards", rewardRouter);

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
