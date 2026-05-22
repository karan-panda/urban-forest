"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TreePine, Home, Compass, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Decorative organic glowing shapes */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -z-10 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-xl text-center space-y-8 z-10 flex flex-col items-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-32 h-32 flex items-center justify-center bg-accent/40 rounded-full border border-primary/20 shadow-xl shadow-primary/5"
        >
          <motion.div
            animate={{ 
              y: [0, -6, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TreePine className="h-16 w-16 text-primary" />
          </motion.div>
          
          {/* Tiny companion leaf or custom icon */}
          <motion.div 
            className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground p-2 rounded-full shadow-lg border-2 border-background"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Compass className="h-4 w-4 animate-spin-slow" />
          </motion.div>
        </motion.div>

        {/* Brand Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/30 text-accent-foreground text-xs font-semibold uppercase tracking-wider border border-accent/20"
        >
          <Map className="w-3.5 h-3.5" />
          Lost in the Woods
        </motion.div>

        {/* Heading */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-emerald-600 to-secondary bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            This branch doesn't exist yet.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/70 max-w-md mx-auto text-sm sm:text-base leading-relaxed"
          >
            It looks like this sapling of a page hasn't been planted, or was swept away by the autumn breeze. Let's get you back onto solid ground.
          </motion.p>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary/95 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/personalize"
            className="flex items-center justify-center gap-2 bg-accent text-accent-foreground border border-primary/20 px-8 py-3.5 rounded-full font-medium hover:bg-accent/80 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <TreePine className="h-4 w-4" />
            Plant a Tree
          </Link>
        </motion.div>
      </div>

      {/* Decorative grass/nature accents at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-emerald-600 to-secondary opacity-30" />
    </div>
  );
}
