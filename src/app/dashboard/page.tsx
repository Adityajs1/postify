"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Client, Account } from "appwrite"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Initialize Appwrite
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)

  const account = new Account(client)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get()
        setUser(res)
      } catch (err) {
        console.error(err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <Card className="w-[400px] border border-slate-700 bg-slate-900/50 backdrop-blur-xl p-8">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-10 w-full" />
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border border-slate-700">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                alt="user"
              />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
              <p className="text-slate-400 text-sm">Here’s what’s happening today</p>
            </div>
          </div>
          <Button
            onClick={() => toast.info("Create Post feature coming soon!")}
            className="bg-indigo-600 hover:bg-indigo-500 transition-all duration-200"
          >
            + New Post
          </Button>
        </div>

        {/* Quick Action Card */}
        <Card className="border border-slate-700 bg-slate-900/60 backdrop-blur-xl shadow-lg mb-10">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Create</CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Share your thoughts or updates in seconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Input placeholder="What's on your mind?" className="bg-slate-800/50 border-slate-700 text-white" />
            <Button
              onClick={() => toast.info("Post feature coming soon!")}
              className="bg-indigo-600 hover:bg-indigo-500"
            >
              Post
            </Button>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <h2 className="text-xl font-semibold mb-4">Your Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="border border-slate-700 bg-slate-900/60 backdrop-blur-xl hover:bg-slate-800/80 transition-all duration-200"
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium">Post Title {i}</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Published on Oct {25 + i}, 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien vel justo
                  aliquet tincidunt.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  onClick={() => toast.info("View post feature coming soon!")}
                >
                  View Post
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
