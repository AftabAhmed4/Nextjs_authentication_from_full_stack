
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import db from "../../../../../lib/db";

// export async function POST(req) {
//     const { email, password } = await req.json();

//     const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

//     if (rows.length === 0)
//         return Response.json({ message: "User not found" }, { status: 404 });

//     const user = rows[0];
//     const match = await bcrypt.compare(password, user.password);

//     if (!match)
//         return Response.json({ message: "Incorrect password" }, { status: 401 });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

//     // Token DB me save karo
//     await db.query("UPDATE users SET active_token=? WHERE id=?", [token, user.id]);

//     const response = Response.json({ message: "Login successful" });
//     response.headers.append(
//         "Set-Cookie",
//         `token=${token}; HttpOnly; Path=/`
//     );

//     return response;
// }
import bcrypt from "bcryptjs"; // bcryptjs recommended
import jwt from "jsonwebtoken";
import db from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

        if (rows.length === 0)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        const user = rows[0];

        // ✅ Check if user is blocked
        if (user.blocked === 1)
            return NextResponse.json({ message: "You are blocked by Admin" }, { status: 403 });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return NextResponse.json({ message: "Incorrect password" }, { status: 401 });

        // JWT token generate karo
        // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );



        // Token DB me save karo
        await db.query("UPDATE users SET active_token=? WHERE id=?", [token, user.id]);

        // Cookie set karo
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });

        return response;
    } catch (err) {
        return NextResponse.json({ message: "Login failed", error: err.message }, { status: 500 });
    }
}
