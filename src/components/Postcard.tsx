"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface PostCardProps {
  title: string
  author: string
  description: string
  date: string
}

export function PostCard({ title, author, description, date }: PostCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Card className="hover:shadow-md transition">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>By {author} • {date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
