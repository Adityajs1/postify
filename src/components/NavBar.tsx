"use client"

import { ThemeToggle } from "@/components/ThemeToggle"

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background text-foreground">
      <h1 className="text-2xl font-bold">Postify</h1>


      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  )
}
