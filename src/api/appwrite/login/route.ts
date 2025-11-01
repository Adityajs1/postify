import { NextResponse } from "next/server";
import { account } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = await account.createEmailPasswordSession(email, password);

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
