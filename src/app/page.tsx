"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-500">
      
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-border bg-[hsl(var(--background))]/70 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/" className="text-2xl font-semibold tracking-tight hover:text-accent transition-colors">
          SubSpace
        </Link>

        <nav className="flex items-center text-lg font-medium">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            Dashboard
          </Link>
          <Link href="/chats" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            Community
          </Link>
          <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            Profile
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-muted/60 transition-colors text-lg px-3 py-2">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-3 py-2">
              Sign up
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Stories */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <h2 className="text-5xl font-semibold mb-12 text-center">
          Featured Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "The Rise of Indie Creators",
              desc: "How micro-creators are shaping the future of digital storytelling.",
            },
            {
              title: "Designing for Focus",
              desc: "Why minimalism isn’t about less — it’s about more clarity and intention.",
            },
            {
              title: "AI and the Future of Content",
              desc: "Can creativity and algorithms truly coexist? Exploring the intersection.",
            },
          ].map((post, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Card className="bg-[hsl(var(--card))] border-border shadow-sm hover:shadow-md hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-3xl font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.desc}
                  </p>
                  <Button
                    variant="link"
                    className="px-0 text-accent font-medium hover:text-accent/80 transition"
                  >
                    Read more →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm bg-[hsl(var(--background))]/60 backdrop-blur-sm">
        <p>
          © {new Date().getFullYear()} <span className="text-foreground font-medium">Subspace</span> — 
          Built with <span className="text-accent font-semibold">Next.js</span> & shadcn/ui
        </p>
      </footer>
    </div>
  );
}
