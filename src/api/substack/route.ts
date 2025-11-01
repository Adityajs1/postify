import { NextResponse } from "next/server";

// Example endpoint: Substack API (replace with your actual endpoint)
const SUBSTACK_API = "https://api.substack.com/api/v1/publication/feed";

export async function GET() {
  try {
    // Fetch posts using your API key
    const response = await fetch(SUBSTACK_API, {
      headers: {
        "Authorization": `Bearer ${process.env.SUBSTACK_API_KEY}`, // keep it secret
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // optional caching (1 hour)
    });

    if (!response.ok) {
      throw new Error(`Substack API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching Substack posts:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
