import pool from "../../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  const { first_name, last_name, email, password } = body;

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
    [first_name, last_name, email, hashed]
  );

  return Response.json({ message: "User registered successfully" });
}
