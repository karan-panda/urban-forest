import Link from "next/link";
import { TreePine, Globe, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <TreePine className="h-8 w-8 text-accent group-hover:text-white transition-colors" />
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-accent transition-colors">
                Urban Forest
              </span>
            </Link>
            <p className="text-secondary-foreground/80 max-w-sm text-sm">
              Plant a tree, track its life, and leave a legacy. Join us in building a greener future, one tree at a time.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><MapPin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-sm tracking-wider">Explore</h4>
            <div className="flex flex-col space-y-2 text-sm text-secondary-foreground/80">
              <Link href="/personalize" className="hover:text-white transition-colors">Plant a Tree</Link>
              <Link href="/story" className="hover:text-white transition-colors">Our Story</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-sm tracking-wider">Legal</h4>
            <div className="flex flex-col space-y-2 text-sm text-secondary-foreground/80">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Urban Forest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
