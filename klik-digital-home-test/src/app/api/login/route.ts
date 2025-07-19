import { NextResponse } from "next/server";
import { z } from "zod";
import users from "@/data/users.json";

const LoginSchema = z.object({
  username: z.string({ message: "Username is required" }),
  password: z.string().min(9, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { username, password } = parsed.data;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      status: "success",
      message: "Login successful",
      data: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        username: user?.username,
      },
    });
    response.cookies.set("token", user.id.toString());

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
