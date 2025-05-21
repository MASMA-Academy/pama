import { load } from "../deps.ts";
import { Pool } from "../deps.ts";

const env = await load();

const POOL_CONNECTIONS = 3;
const pool = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  hostname: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  tls: {
    enabled: true,
    enforce: false,
  },
}, POOL_CONNECTIONS, true);

export async function query(text: string, params: unknown[] = []) {
  const client = await pool.connect();
  try {
    await client.queryArray(`SET search_path TO ${env.DB_SCHEMA}`);
    const result = await client.queryObject(text, params);
    return result;
  } finally {
    client.release();
  }
}
