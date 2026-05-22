"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TreePine, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <TreePine className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              Urban Forest
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/personalize" className="text-foreground/80 hover:text-primary transition-colors font-medium">Plant a Tree</Link>
            <Link href="/story" className="text-foreground/80 hover:text-primary transition-colors font-medium">Our Story</Link>
            <Link 
              href="/track" 
              className="border border-emerald-500/30 dark:border-emerald-400/20 text-foreground hover:text-primary hover:border-primary transition-all px-4 py-1.5 rounded-full font-semibold flex items-center gap-1.5 text-sm bg-white/40 dark:bg-emerald-950/10 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Track Your Tree 🔒
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            <Link href="/personalize" onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary font-medium">Plant a Tree</Link>
            <Link href="/story" onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary font-medium">Our Story</Link>
            <Link 
              href="/track" 
              onClick={() => setIsOpen(false)} 
              className="border border-emerald-500/25 text-foreground hover:text-primary hover:border-primary transition-all px-4 py-2.5 rounded-xl font-semibold flex items-center justify-between text-sm bg-emerald-500/5"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Track Your Tree
              </span>
              <span className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-black uppercase">Locked 🔒</span>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
