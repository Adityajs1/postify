import { NextResponse } from "next/server";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const response = await account.create(ID.unique(), email, password, name);

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
