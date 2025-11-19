import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    const author = await prisma.author.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, avatar: true },
    });

    return NextResponse.json({ user: author }, { status: 200 });
  } catch (error) {
    console.error("ME endpoint error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
