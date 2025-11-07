"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenTool, Pen, Sparkles, Feather, BookOpenText, Quote, Mic, Camera } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--muted))]/50 to-[hsl(var(--background))] overflow-hidden">

      {/* === Decorative Floating Icons === */}

      <motion.div
        className="absolute top-[43%] left-[56.5%] text-purple-500"
      >
        <Mic size={45} strokeWidth={1.2} />
      </motion.div>
      {/* === Hero Text === */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-7xl md:text-8xl font-medium leading-tight max-w-6xl font-[Times_New_Roman] tracking-tight text-foreground/80"
      >
        Where Ideas Find Their <br /> <span className="text-accent/100">Voice</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-6 text-xl md:text-2xl font-sans font-normal text-muted-foreground/60 max-w-3xl leading-relaxed"
      >
        A clean and timeless space to write, reflect, and connect.  
        Built for those who care about <span className="text-accent font-bold">depth</span>,  
        <span className="text-accent font-bold"> design</span>, and <span className="text-accent font-bold">authenticity.</span>
      </motion.p>

      {/* === CTA Buttons === */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link href="/signup">
          <Button
            size="lg"
            className="px-8 py-6 text-lg rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-accent/30 transition"
          >
            Start Writing
          </Button>
        </Link>
        <Link href="/login">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg rounded-full border-border hover:bg-muted/50 transition"
          >
            Explore
          </Button>
        </Link>
      </div>

      {/* === Star Accent below CTA buttons === */}
      <motion.div
        className="absolute top-[22%] left-[46%] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.15, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={30} strokeWidth={1.4} fill="yellow" />
      </motion.div>
    </section>
  );
}

