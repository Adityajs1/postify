"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar({ onChange }: { onChange?: (value: string) => void }) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search posts, users, or tags..."
        className="pl-9"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
