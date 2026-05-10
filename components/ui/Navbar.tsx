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
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/personalize" className="text-foreground/80 hover:text-primary transition-colors font-medium">Plant a Tree</Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors font-medium">My Forest</Link>
            <Link href="/impact" className="text-foreground/80 hover:text-primary transition-colors font-medium">Impact</Link>
            <ThemeToggle />
            <Link 
              href="/personalize" 
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
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
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary font-medium">My Forest</Link>
            <Link href="/impact" onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary font-medium">Impact</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
