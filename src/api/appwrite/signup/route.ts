import { NextResponse } from "next/server";
import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Step 1: Create the Appwrite user
    const user = await account.create(ID.unique(), email, password, name);

    // Step 2: Create a writer profile in your "writers_data" table
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_WRITERS!,
      user.$id, // use same ID as the user
      {
        fullName: name,
        email: email,
        bio: "",
        nationality: "",
        numberOfPublishedWorks: 0,
      }
    );

    return NextResponse.json({
      success: true,
      message: "User and writer profile created successfully!",
      user,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Signup failed" },
      { status: 400 }
    );
  }
}
