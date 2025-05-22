import { Request, Response } from "express";
import { pool } from "../db.ts";

export const linkFamilyMember = async (req: Request, res: Response) => {
  const parentId = Number(req.params.parentId);
  const { memberEmail } = req.body;

  if (!memberEmail) {
    return res.status(400).json({ message: "Member Email is required" });
  }

  let client;
  try {
    client = await pool.connect();

    // Check if member exists
    const memberResult = await client.queryObject<{ id: number }>(
      "SELECT id FROM users WHERE email = $1 AND role = 'member'",
      [memberEmail]
    );

    if (memberResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Family member not found or not a 'member' account" });
    }

    const memberId = memberResult.rows[0].id;

    // Check if already linked
    const existsCheck = await client.queryObject(
      "SELECT id FROM familymembers WHERE parent_id = $1 AND member_id = $2",
      [parentId, memberId]
    );

    if (existsCheck.rows.length > 0) {
      return res.status(409).json({ message: "Member already linked to parent" });
    }

    // Link family member
    await client.queryObject(
      "INSERT INTO familymembers (parent_id, member_id) VALUES ($1, $2)",
      [parentId, memberId]
    );

    res.status(200).json({ message: "Family member linked successfully" });
  } catch (error) {
    res.status(500).json({ message: "DB error", error: error.message });
  } finally {
    client?.release();
  }
};
