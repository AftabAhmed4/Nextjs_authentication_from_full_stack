
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../../../lib/db";

export async function POST(req) {
  const { email, password } = await req.json();

  const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (rows.length === 0)
    return Response.json({ message: "User not found" }, { status: 404 });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return Response.json({ message: "Incorrect password" }, { status: 401 });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  const response = Response.json({ message: "Login successful" });
  response.headers.append(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/`
  );

  return response;
}
