"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import { Input } from "@/components/ui/input"

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight">My App</h1>
        <Input
          placeholder="Search..."
          className="hidden md:block w-64 bg-muted/30 border-none focus:ring-0"
        />
      </div>
      <ThemeToggle />
    </nav>
  )
}
