import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_WRITERS!;

export async function GET() {
  try {
    const writers = await databases.listDocuments(DB_ID, COLLECTION_ID);
    return NextResponse.json({ success: true, writers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
