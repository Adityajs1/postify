"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appwrite/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Signup failed. Try again.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--login-bg-light))] dark:bg-[hsl(var(--login-bg-dark))] transition-colors duration-500">
      <Card className="w-[500px] border-border bg-[hsl(var(--login-card-bg-light))] dark:bg-[hsl(var(--login-card-bg-dark))] shadow-lg text-[hsl(var(--foreground))]">
        <CardHeader className="text-center space-y-3 pt-8">
          <CardTitle className="text-3xl font-bold text-center">Create your account</CardTitle>
        </CardHeader>
        <CardContent className="p-12">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground font-medium mb-2">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Aditya Tiwari"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[hsl(var(--background))] border-border text-[hsl(var(--foreground))] placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[hsl(var(--login-card-bg-light))] dark:focus:ring-offset-[hsl(var(--login-card-bg-dark))]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground font-medium mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[hsl(var(--background))] border-border text-[hsl(var(--foreground))] placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[hsl(var(--login-card-bg-light))] dark:focus:ring-offset-[hsl(var(--login-card-bg-dark))]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground font-medium mb-2">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[hsl(var(--background))] border-border text-[hsl(var(--foreground))] placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[hsl(var(--login-card-bg-light))] dark:focus:ring-offset-[hsl(var(--login-card-bg-dark))]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-200 py-3"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-accent hover:text-accent/80 transition font-medium">
              Log in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

