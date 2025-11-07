import { NextResponse } from "next/server";
import { databases, ID } from "@/lib/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_POSTS!;

export async function GET() {
  try {
    const posts = await databases.listDocuments(DB_ID, COLLECTION_ID);
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, authorId } = await req.json();

    const post = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      { title, content, authorId }
    );

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("Create Post Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
