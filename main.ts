import express from "express";
import details from "./details.json" with { type: "json" };

import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

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

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the PAMA - House Chore API!");
});

// Details route
app.get("/details", (req, res) => {
  res.send(details);
});

// Test DB connection route (optional)
app.get("/db-test", async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject("SELECT NOW() AS now");
    res.json({ dbTime: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Database connection error", details: err.message });
  } finally {
    if (client) client.release();
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
