import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { NavBar } from "@/components/NavBar"
import { SideBar } from "@/components/SideBar"
import { Inter, Merriweather, Lora, Montserrat } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700", "900"] })
const lora = Lora({ subsets: ["latin"], weight: ["400", "600"] })
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "900"] })

export const metadata: Metadata = {
  title: "Postify",
  description: "A full-stack Next.js app with shadcn UI and Appwrite",
}

import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 flex flex-col">
              <NavBar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
