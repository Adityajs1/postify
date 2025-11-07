import { NextResponse } from "next/server";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const session = await account.createEmailPasswordSession(email, password);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      session,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: error?.message || "Login failed",
    }, { status: 400 });
  }
}
