import { NextResponse } from "next/server";
import { account } from "@/lib/appwrite";

export async function POST() {
  try {
    await account.deleteSessions();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
