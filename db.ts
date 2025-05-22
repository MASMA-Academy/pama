// db.ts
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const env = await load();

export const pool = new Pool({
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

export default pool;