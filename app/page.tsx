"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Globe2, Heart, Award, Sparkles, ChevronRight, Wind, ShieldCheck, HelpCircle } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

// Tree catalog data matching the user's specific request
const HOME_TREE_CATALOG = [
  { 
    id: "neem", 
    name: "Neem", 
    scientific: "Azadirachta indica",
    indian: "Divine Herb",
    price: 35, 
    minQty: 100,
    co2: "40 kg/yr", 
    icon: "🍃",
    color: "from-emerald-400 to-green-500",
    desc: "Nature's premier pharmacist. Essential for regional biodiversity and community pesticide resistance."
  },
  { 
    id: "banyan", 
    name: "Banyan", 
    scientific: "Ficus benghalensis",
    indian: "Bargad",
    price: 80, 
    minQty: 1,
    co2: "80 kg/yr", 
    icon: "🌳",
    color: "from-green-500 to-emerald-600",
    desc: "National tree of India. Provides massive green shade and builds an entire micro-ecosystem under its branches."
  },
  { 
    id: "peepal", 
    name: "Peepal", 
    scientific: "Ficus religiosa",
    indian: "Sacred Fig",
    price: 80, 
    minQty: 1,
    co2: "75 kg/yr", 
    icon: "🌿",
    color: "from-teal-400 to-emerald-500",
    desc: "The round-the-clock oxygen engine. Celebrated for thousands of years in local folklore for clean energy vibes."
  },
  { 
    id: "bokul", 
    name: "Bokul", 
    scientific: "Mimusops elengi",
    indian: "Bakula",
    price: 200, 
    minQty: 1,
    co2: "30 kg/yr", 
    icon: "🌸",
    color: "from-orange-400 to-amber-500",
    desc: "Traditional evergreen tree known for its legendary star-shaped flowers and beautiful aromatic scent."
  },
  { 
    id: "rita", 
    name: "Rita", 
    scientific: "Sapindus mukorossi",
    indian: "Reetha",
    price: 200, 
    minQty: 1,
    co2: "28 kg/yr", 
    icon: "🧼",
    color: "from-yellow-400 to-amber-500",
    desc: "Produces soapnuts—nature's natural chemical-free organic resource for laundry and body wash."
  },
  { 
    id: "bahava", 
    name: "Bahava", 
    scientific: "Cassia fistula",
    indian: "Amaltas",
    price: 200, 
    minQty: 1,
    co2: "32 kg/yr", 
    icon: "✨",
    color: "from-amber-400 to-orange-500",
    desc: "The breathtaking Golden Shower tree. Drapes city avenues in bright golden flowers throughout the Indian summer."
  },
  { 
    id: "gulmohar", 
    name: "Gulmohar", 
    scientific: "Delonix regia",
    indian: "Crimson Glory",
    price: 200, 
    minQty: 1,
    co2: "35 kg/yr", 
    icon: "🔥",
    color: "from-red-400 to-orange-500",
    desc: "Spectacular canopy with fiery crimson blossoms. Highly loved by landscape artists and young travelers."
  }
];

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* HERO SECTION */}
      <section 
        ref={targetRef}
        className="relative min-h-[95vh] flex items-center justify-center pt-24 md:pt-28 pb-16 px-4"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/10 via-background to-background" />
        
        {/* Fine background noise mesh & circular glow patterns for Web3 tech vibe */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.6, 0.4] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/10 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.12, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-1/4 right-1/10 w-[35rem] h-[35rem] bg-teal-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-primary dark:text-emerald-400 border border-emerald-500/15 font-bold text-xs md:text-sm uppercase tracking-wider mx-auto"
          >
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span>Join 12,000+ Young Forest Builders</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.05] sm:leading-[1.02]"
            >
              Plant Real Trees. <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 bg-clip-text text-transparent">
                Leave a Legacy.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Geo-tag genuine local saplings, monitor chlorophyll gains, and trigger automated smart updates—tailored for young green warriors.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto w-full px-4"
          >
            <Link 
              href="/personalize" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-base font-black shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Start Reforesting Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-white/70 dark:bg-emerald-950/20 backdrop-blur-md text-foreground border border-border rounded-full text-base font-extrabold hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-1.5"
            >
              My Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC TREE CATALOG SECTION */}
      <section className="py-24 bg-gradient-to-b from-background via-emerald-500/5 to-background border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest inline-block border border-emerald-500/10">
              Indian Native Species
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Our Green Catalog</h2>
            <p className="text-foreground/60 text-sm md:text-base max-w-lg mx-auto font-medium">
              We plant trees with deep local roots. Affordably priced to help every student and citizen expand India's biological covers.
            </p>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_TREE_CATALOG.map((tree, idx) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/60 dark:bg-[#122216]/50 backdrop-blur-xl border border-primary/10 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/35 transition-all duration-300 relative group min-h-[300px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-white dark:bg-[#152418] w-12 h-12 rounded-2xl flex items-center justify-center shadow-md">
                      {tree.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {tree.indian}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">{tree.name}</h3>
                  <span className="text-[10px] italic text-foreground/45 font-serif block mt-0.5">{tree.scientific}</span>
                  <p className="text-xs text-foreground/65 mt-3 leading-relaxed font-medium">{tree.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/5 flex justify-between items-end">
                  <div>
                    <span className="text-[9px] text-foreground/45 uppercase tracking-wider block font-bold">CO₂ Offsets</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{tree.co2}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-foreground/45 uppercase tracking-wider block font-bold">Pledge Cost</span>
                    <span className="text-lg font-black text-foreground">
                      ₹{tree.price}
                      {tree.id === "neem" && <span className="text-3xs text-foreground/40 font-bold block">(Min 100 Qty)</span>}
                    </span>
                  </div>
                </div>

                {/* Hidden Quick Action Layer */}
                <Link 
                  href="/personalize" 
                  className="absolute inset-0 bg-transparent opacity-0 pointer-events-auto"
                />
              </motion.div>
            ))}

            {/* Extra Promo slot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-[2rem] p-6 shadow-xl flex flex-col justify-between min-h-[300px] text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <Sparkles className="w-10 h-10 bg-white/20 p-2 rounded-2xl" />
                <h3 className="text-xl font-black leading-snug">Need a customized CSR forest grove?</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                  We design corporate clusters that offset whole factories. Click to start a custom inquiry.
                </p>
              </div>

              <Link 
                href="/personalize" 
                className="mt-6 px-6 py-3.5 bg-white text-emerald-900 rounded-2xl font-black text-xs shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-1.5 w-full relative z-10"
              >
                Pledge Custom Grove <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricCard 
              icon={<Leaf className="w-7 h-7 text-emerald-500" />}
              value="48,790"
              label="Real Saplings Sown"
              sub="Growing and verified by geo-tags"
            />
            <MetricCard 
              icon={<Globe2 className="w-7 h-7 text-blue-500" />}
              value="1.38M kg"
              label="Cumulative CO₂ Offset"
              sub="Calculated monthly from canopy scales"
            />
            <MetricCard 
              icon={<Heart className="w-7 h-7 text-red-500 fill-red-500" />}
              value="15,400+"
              label="Pledged Guardians"
              sub="Individual & corporate partners"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / VALUE PROPOSITION */}
      <section className="py-24 bg-gradient-to-b from-background via-emerald-500/5 to-background border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Reforestation Solved</h2>
            <p className="text-foreground/60 text-sm md:text-base max-w-xl mx-auto font-medium">
              Transparent, trackable, and engaging. Here is how Urban Forest connects digital pledges to ground impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              number="01"
              title="Personalize Tree"
              desc="Choose the sapling, quantity, and coordinate point on our map. Dedicate to parents, kids, or birthdays."
            />
            <FeatureCard 
              number="02"
              title="Coordinate & Sow"
              desc="Our regional foresters plant the sapling in designated cycles and tag it with actual coordinates."
            />
            <FeatureCard 
              number="03"
              title="Track Smart Vibe"
              desc="Monitor growth certificates, look up simulated chlorophyll offsets, and level up your ranking badges."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-tr from-emerald-900 to-green-800 dark:from-emerald-950 dark:to-emerald-900 text-white relative overflow-hidden text-center px-4">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none -z-0" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <Award className="w-14 h-14 mx-auto text-emerald-300" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">Ready to plant your legacy?</h2>
          <p className="text-emerald-100/80 text-sm md:text-base max-w-xl mx-auto font-medium">
            It takes less than 2 minutes to coordinate a grove that will purify India's atmosphere for generations to come.
          </p>
          <div className="pt-4">
            <Link 
              href="/personalize" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 rounded-full text-base font-black shadow-xl hover:scale-105 transition-transform"
            >
              Plant Your First Tree <ArrowRight className="w-5 h-5 text-emerald-800" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, value, label, sub }: { icon: React.ReactNode, value: string, label: string, sub: string }) {
  return (
    <div className="bg-white/80 dark:bg-[#122216]/50 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-primary/10 flex items-center gap-5 transform hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 bg-white dark:bg-[#152418] border border-primary/10 rounded-2xl flex items-center justify-center shadow-md shrink-0">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-3xl font-black text-foreground leading-none tracking-tight">{value}</h3>
        <p className="text-xs font-extrabold text-foreground/80">{label}</p>
        <p className="text-[10px] text-foreground/45 font-medium">{sub}</p>
      </div>
    </div>
  );
}

function FeatureCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="bg-white/60 dark:bg-[#122216]/50 backdrop-blur-xl p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden group flex flex-col justify-between min-h-[220px] hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300">
      <div className="text-7xl font-black text-emerald-500/5 absolute -top-2 -right-2 transition-transform group-hover:scale-110 group-hover:text-emerald-500/10 pointer-events-none select-none">
        {number}
      </div>
      <div className="space-y-3 relative z-10 pt-4">
        <h3 className="text-xl font-extrabold text-foreground">{title}</h3>
        <p className="text-xs md:text-sm text-foreground/70 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
