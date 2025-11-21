import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "../../../../lib/db";


export async function GET(req) {
  try {
    // Token cookie se fetch karo
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // DB se user fetch karo
    const [rows] = await db.query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return user profile
    return NextResponse.json({ profile: rows[0] });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token", error: err.message }, { status: 401 });
  }
}
