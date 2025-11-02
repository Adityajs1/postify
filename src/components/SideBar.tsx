"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function SideBar() {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chats", label: "Chats" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <motion.aside
      className="hidden md:flex flex-col w-60 border-r min-h-screen p-4 bg-background/50 backdrop-blur-md"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-4 mb-6 shadow-sm">Menu</Card>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.aside>
  )
}
