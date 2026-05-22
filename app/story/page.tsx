"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { 
  TreePine, 
  MapPin, 
  ArrowRight, 
  Heart, 
  Calendar,
  Sparkles,
  Users,
  Compass,
  Radio,
  FileCheck,
  ChevronDown
} from "lucide-react";

// Local Mumbai timeline events with corresponding visual assets
const TIMELINE_EVENTS = [
  {
    id: 1,
    chapter: "Chapter 1",
    period: "Mid 2024",
    location: "Ghatkopar, Mumbai",
    title: "Monsoon over concrete blocks",
    subtitle: "The smoky, humid sky realization",
    icon: Compass,
    image: "/images/story_monsoon.png",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    gradient: "from-amber-500/5 to-transparent",
    quickText: "We felt the deep void of losing touch with the nature of our native villages while sitting in a tiny 1BHK in Ghatkopar, staring at a smoky horizon of concrete.",
    story: "Two friends sitting in a cramped 1BHK in Ghatkopar, listening to the relentless Mumbai rain lash against the window. In Mumbai, the monsoon is a raw, beautiful force of nature—but as we looked out towards Kurla, we saw the rain washing over endless gray rooftops, concrete coastal road projects, and busy railway lines. The green canopy we grew up with in our hometowns in Konkan and Kerala was missing. The air was heavy, humid, and thick with exhaust. We weren't just city youngsters climbing the corporate ladder; we felt deeply homesick for the smell of wet earth and ancient trees."
  },
  {
    id: 2,
    chapter: "Chapter 2",
    period: "Late 2024",
    location: "South Mumbai",
    title: "The carbon certificate disillusion",
    subtitle: "When greening became a sterile transaction",
    icon: FileCheck,
    image: "/images/story_certificate.png",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-500/5 to-transparent",
    quickText: "Hoping to help, we bought a carbon credit tree online and received a cold 16-digit PDF invoice instead of any connection to actual soil.",
    story: "Hoping to make a difference, we scraped some savings together to buy 'carbon offset trees' online. Three days later, a sterile email arrived containing a PDF certificate with a 16-digit transaction serial number. There was no photo of the tree, no local coordinates, and no species name. We asked ourselves: did this tree actually get planted? Who is watering it? Is it even alive? We realized modern carbon offsetting had turned a beautiful, organic act of giving life into a cold financial transaction. People don't want sterile sheets of paper—they want a real, living connection to the soil."
  },
  {
    id: 3,
    chapter: "Chapter 3",
    period: "Early 2025",
    location: "Thane & Palghar",
    title: "QR codes in the mud",
    subtitle: "A weekend nursery experiment",
    icon: TreePine,
    image: "/images/story_experiment.png",
    color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    gradient: "from-teal-500/5 to-transparent",
    quickText: "We spent pocket money on five Neem and Jamun saplings in Thane, attached hand-made QR codes, and watched local commuters join us in caring.",
    story: "We decided to take matters into our own hands. We spent our weekend money buying five native Neem and Jamun saplings from a local nursery. We travelled out to a neglected patch of land near Thane, dug the dry soil with our own hands under the scorching sun, and tied crude, hand-laminated QR codes to their trunks. The QR codes linked to a simple Google Sheet where we posted growth notes. To our complete shock, local daily commuters actually scanned them! Some of them emailed us, others brought water on their morning walks. We realized that if you give people an honest, transparent way to care, they will step up."
  },
  {
    id: 4,
    chapter: "Chapter 4",
    period: "Late 2025",
    location: "Across Maharashtra",
    title: "Reaching 48,790 saplings",
    subtitle: "Grassroots drives with local communities",
    icon: Users,
    image: "/images/story_community.png",
    color: "text-primary bg-primary/10 border-primary/20",
    gradient: "from-primary/5 to-transparent",
    quickText: "We partnered with college green clubs (St. Xavier's, Ruia) and regional NGOs. Student volunteers dug holes in the muddy rain to plant geo-tagged trees.",
    story: "We had no corporate sponsors or venture capital. So, we did what Mumbaikars do: we built a community. We partnered with college green clubs (like St. Xavier's and Ruia College) and small, local environmental NGOs in Maharashtra. We organized weekend drives. Hundreds of young student volunteers showed up in the pouring rain, getting covered in mud to dig pits and verify geo-tags. That raw, grassroots effort is how we scaled from 5 saplings to the 48,790 real saplings sown, 12,000+ forest builders, and 15,400+ pledged guardians you see on our homepage today. It wasn't marketing—it was pure human sweat."
  },
  {
    id: 5,
    chapter: "Chapter 5",
    period: "2026 & Future",
    location: "Going Public",
    title: "Our honest future promise",
    subtitle: "Real physical IoT tracking on public horizon",
    icon: Radio,
    image: "/images/story_future.png",
    color: "text-secondary bg-secondary/10 border-secondary/20",
    gradient: "from-secondary/5 to-transparent",
    quickText: "Opening the forest to everyone. We want to be honest: if this crowdfunding pledging stage succeeds, we will build the actual real-time physical tree tracking.",
    story: "We are preparing to take our platform public so anyone, anywhere can have native trees planted with absolute transparency. But we want to be 100% honest with you: right now, the live chlorophyll monitoring and automated smart feeds on our website are interactive mockups of our ultimate vision. We don't have IoT sensors on all 48,000 trees yet. But this is our promise: if this public pledging campaign is successful and we secure the foundation, we will build actual real features to track every tree—installing physical tracking, hiring local community caretakers to capture regular photos, and providing real-time geolocation growth diaries. This is just the beginning of a true, citizen-owned urban forest."
  }
];

export default function OurStory() {
  // Only first chapter (id: 1) is open by default
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);

  const toggleChapter = (id: number) => {
    setExpandedChapter((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl -z-10 animate-pulse" style={{ animationDelay: "3s" }} />

      {/* Hero Header */}
      <div className="max-w-3xl mx-auto px-6 pt-24 md:pt-32 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/40 text-accent-foreground text-xs font-semibold uppercase tracking-wider border border-accent/20"
        >
          <Heart className="w-3.5 h-3.5" />
          The Founder's Letter
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          Our Journey: Two Balconies <br className="hidden sm:inline" />
          and <span className="bg-gradient-to-r from-emerald-500 via-primary to-secondary bg-clip-text text-transparent">48,790 Muddy Saplings</span>
        </h1>
        
        <p className="text-base md:text-lg text-foreground/80 font-medium max-w-xl mx-auto leading-relaxed">
          We didn't start with venture funding. We started with a rainy afternoon in Mumbai, five native saplings, and a promise to build a real forest.
        </p>
      </div>

      {/* Connected Timeline Grid */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-16 relative">
        {/* Seamless Vertical Timeline Line directly behind bullets */}
        <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-border/80 dark:bg-border/30 -z-10" />

        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event) => {
            const Icon = event.icon;
            const isOpen = expandedChapter === event.id;
            
            return (
              <div
                key={event.id}
                className="relative pl-12 sm:pl-16 group"
              >
                {/* Timeline Icon Node - Perfectly Centered on the line */}
                <button
                  onClick={() => toggleChapter(event.id)}
                  className={`absolute left-2 sm:left-4 top-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border bg-white dark:bg-[#0d1a12] flex items-center justify-center shadow-md transition-all duration-300 z-10 ${
                    isOpen 
                      ? "ring-4 ring-primary/30 border-primary scale-110" 
                      : "border-border/60 hover:border-primary/50 group-hover:scale-105"
                  } ${event.color}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Interactive Card */}
                <div 
                  onClick={() => toggleChapter(event.id)}
                  className={`bg-white/40 dark:bg-emerald-950/10 backdrop-blur-md border rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer select-none ${
                    isOpen 
                      ? "border-primary shadow-lg ring-1 ring-primary/20 bg-white/70 dark:bg-emerald-950/20" 
                      : "border-border/60 dark:border-border/10 hover:border-primary/30 dark:hover:border-emerald-500/20"
                  }`}
                >
                  {/* Subtle internal gradient background */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${event.gradient} rounded-full blur-2xl pointer-events-none -z-10`} />

                  {/* Chapter Header */}
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-0.5">
                        {event.chapter}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    
                    {/* Expand/Collapse Chevron Indicator */}
                    <div className="shrink-0 p-1.5 rounded-full bg-foreground/5 text-foreground/45">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                    </div>
                  </div>

                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-2xs font-extrabold text-foreground/50 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.period}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                  </div>

                  {/* Always-visible Quick Summary */}
                  <div className="bg-primary/5 dark:bg-emerald-500/5 p-4 rounded-2xl border border-primary/10 text-xs sm:text-sm font-semibold text-foreground/80 leading-relaxed">
                    {event.quickText}
                  </div>

                  {/* Expandable Section: Chapter Image & Full Emotional Prose */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden space-y-4"
                      >
                        {/* High-Fidelity visual representing the story */}
                        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-border/50 shadow-sm">
                          <Image 
                            src={event.image} 
                            alt={event.title} 
                            fill 
                            priority={event.id === 1}
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-w-7xl) 100vw"
                          />
                        </div>

                        {/* Detailed Story Prose */}
                        <p className="text-foreground/75 text-sm sm:text-base leading-relaxed font-medium pt-2 border-t border-border/50 dark:border-border/10">
                          {event.story}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call-to-Action Bottom card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-20">
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl relative overflow-hidden border border-emerald-500/25"
        >
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
            <TreePine className="w-72 h-72" />
          </div>

          <div className="space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Let's build a real, citizen forest together.
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-medium">
              We aren't building a corporate scheme. We are building an urban forest grown and owned by the citizens of India. Pledge your first tree today, and write the next chapter with us.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/personalize"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-950 hover:bg-emerald-50 px-6 py-3.5 rounded-full font-black text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Pledge your first tree
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-emerald-900/50 hover:bg-emerald-900/70 text-white px-6 py-3.5 rounded-full font-extrabold text-sm transition-all border border-emerald-500/30"
              >
                Back to home page
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
