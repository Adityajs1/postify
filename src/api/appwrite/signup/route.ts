import { NextResponse } from "next/server"
import { Client, Account, ID } from "appwrite"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID

const account = new Account(client)

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Create a new account
    const user = await account.create(ID.unique(), email, password, name)

    return NextResponse.json(
      { success: true, message: "Account created successfully", user },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create account" },
      { status: 500 }
    )
  }
}

// Optional: Handle preflight CORS (useful for fetch requests from browser)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
