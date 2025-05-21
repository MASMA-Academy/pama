import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { query } from "../db/client.ts";

export async function getChores(ctx: RouterContext) {
  try {
    const result = await query("SELECT * FROM chores");
    ctx.response.body = result.rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to fetch chores" };
  }
}
