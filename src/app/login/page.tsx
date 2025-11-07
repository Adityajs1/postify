"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/appwrite/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--login-bg-light))] dark:bg-[hsl(var(--login-bg-dark))] transition-colors duration-500">
      <Card className="w-[500px] bg-[hsl(var(--login-card-bg-light))] dark:bg-[hsl(var(--login-card-bg-dark))] text-[hsl(var(--foreground))] border-border shadow-lg">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-bold flex justify-center items-center gap-3">
            <LogIn className="h-7 w-7 text-accent" /> Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Login to continue to your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="p-12">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[hsl(var(--background))] border-border text-[hsl(var(--foreground))] placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[hsl(var(--login-card-bg-light))] dark:focus:ring-offset-[hsl(var(--login-card-bg-dark))]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[hsl(var(--background))] border-border text-[hsl(var(--foreground))] placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[hsl(var(--login-card-bg-light))] dark:focus:ring-offset-[hsl(var(--login-card-bg-dark))]"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-4">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-200 py-3"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-sm text-center text-muted-foreground mt-4">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-accent hover:underline hover:text-accent/80 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
