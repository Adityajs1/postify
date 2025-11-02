"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-white to-muted/40">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-5 border-b bg-background/70 backdrop-blur-md sticky top-0 z-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          SubSpace
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">
            Dashboard
          </Link>
          <Link href="/chats" className="text-muted-foreground hover:text-foreground transition">
            Community
          </Link>
          <Link href="/profile" className="text-muted-foreground hover:text-foreground transition">
            Profile
          </Link>
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl"
        >
          Where Ideas Find Their Voice.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl"
        >
          A clean and open space for your thoughts, stories, and reflections.
          Built for writers and readers who value authenticity.
        </motion.p>

        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <Button size="lg">Start Writing</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Explore
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Featured Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Rise of Indie Creators",
              desc: "How micro-creators are changing the future of media and community.",
            },
            {
              title: "Designing for Focus",
              desc: "Exploring how minimal design improves creative thinking and reading.",
            },
            {
              title: "AI and the Future of Content",
              desc: "From writing assistants to creative collaborators — where are we headed?",
            },
          ].map((post, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="shadow-sm hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.desc}</p>
                  <Button variant="link" className="px-0 text-primary">
                    Read more →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} SubSpace — Built with Next.js & shadcn/ui
      </footer>
    </div>
  );
}
