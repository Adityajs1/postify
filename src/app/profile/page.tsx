"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Client, Account } from "appwrite"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Appwrite setup
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  const account = new Account(client)

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get()
        setUser(res)
      } catch (err) {
        console.error(err)
        toast.error("You need to log in first.")
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  // Logout
  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      toast.success("Logged out successfully!")
      router.push("/login")
    } catch (err) {
      toast.error("Logout failed. Try again.")
    }
  }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <Card className="w-[420px] border border-slate-700 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-20 h-20 mb-3 border border-slate-700 shadow-md">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
              alt="Profile"
            />
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
          <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
        </CardHeader>

        <CardContent className="space-y-4 mt-4">
          <div className="rounded-lg bg-slate-800/40 p-4 border border-slate-700">
            <p className="text-sm text-slate-400">User ID</p>
            <p className="text-white text-sm font-medium truncate">{user?.$id}</p>
          </div>

          <div className="rounded-lg bg-slate-800/40 p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Email Verification</p>
            <p className={`font-medium ${user?.emailVerification ? "text-green-400" : "text-red-400"}`}>
              {user?.emailVerification ? "Verified" : "Not Verified"}
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              onClick={() => toast.info("Profile editing coming soon!")}
              className="bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 w-[48%]"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 transition-all duration-200 w-[48%]"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
