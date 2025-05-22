import db from "../db.ts";

export interface Reward{
    id: number;
    reward: string;
    points: string;
}

export async function createReward(result: Partial<Reward>): Promise<Reward> {
  const { reward, points } = result;

  const client = await db.connect();
  try {
    const queryResult = await client.queryObject<Reward>(
      "INSERT INTO reward ( reward, points) VALUES ($1, $2) RETURNING *",
      [ reward, points]
    );
    return queryResult.rows[0];
  } finally {
    client.release();
  }
}