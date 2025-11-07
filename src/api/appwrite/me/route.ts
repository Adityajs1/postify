import { NextResponse } from "next/server";
import { account } from "@/lib/appwrite";

export async function GET() {
  try {
    const user = await account.get();
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ success: false, user: null });
  }
}
