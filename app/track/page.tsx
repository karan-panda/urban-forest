"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Lock, Compass, Cpu, Activity, ArrowRight, ShieldCheck, Zap
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TrackYourTree() {
  const router = useRouter();

  const handlePledgeAction = () => {
    // Redirect to personalize/plant-a-tree flow
    router.push("/personalize");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-emerald-50/20 dark:to-emerald-950/10 pt-20 md:pt-28 pb-20 relative overflow-hidden flex flex-col justify-center animate-fade-in">
      {/* Soft atmospheric gradient vector graphics for premium look */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-25 dark:opacity-15">
        <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Simplified Inspiring Header */}
        <div className="text-center mb-10 space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-primary dark:text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-500/15"
          >
            <Zap className="w-3.5 h-3.5 fill-primary" />
            <span>Next-Gen Reforestation</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
          >
            IoT & Satellite Tracking
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/75 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed"
          >
            Curious about your tree's daily growth? We're setting up a network of ground IoT sensors and high-resolution satellite links so you can check on your saplings anytime, anywhere.
          </motion.p>
        </div>

        {/* Minimal Dashboard Frame */}
        <div className="relative border border-primary/10 rounded-[2.5rem] p-3 bg-white/5 dark:bg-[#0c150e]/30 backdrop-blur-sm shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* THE MOCK TELEMETRY PREVIEW (BLURRED AND LOCKED) */}
          <div className="w-full h-full filter blur-[8px] pointer-events-none select-none grid grid-cols-1 md:grid-cols-3 gap-4 p-4 flex-1">
            
            {/* IoT Ground Sensor Vitals Preview */}
            <div className="bg-white/40 dark:bg-emerald-950/20 border border-primary/10 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-2 border-b border-primary/5 pb-2">
                <Cpu className="w-4.5 h-4.5 text-primary" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-foreground">IoT Soil Telemetry</h4>
              </div>
              <div className="space-y-2 text-2xs font-mono text-foreground/80">
                <div className="flex justify-between">
                  <span>Soil Hydration:</span>
                  <span className="text-teal-500 font-extrabold">64% [IoT Sensor 8A]</span>
                </div>
                <div className="flex justify-between">
                  <span>Ground Temperature:</span>
                  <span>26.4°C [IoT Active]</span>
                </div>
                <div className="flex justify-between">
                  <span>Micro-Nutrients:</span>
                  <span className="text-emerald-500">Optimal N-P-K</span>
                </div>
              </div>
              <div className="bg-emerald-500/10 px-2 py-1 rounded-lg text-center text-3xs font-black text-primary">
                GROUND NETWORK LINKED
              </div>
            </div>

            {/* Satellite Raster Map Target Preview */}
            <div className="bg-white/40 dark:bg-emerald-950/20 border border-primary/10 rounded-3xl p-5 flex flex-col items-center justify-center relative min-h-[160px]">
              <div className="w-28 h-28 rounded-full border border-primary/20 flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full border border-dashed border-primary/25 flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-white" />
                </div>
                <div className="absolute top-1 left-2 text-[8px] font-mono text-primary font-bold">19.0760° N</div>
                <div className="absolute bottom-1 right-2 text-[8px] font-mono text-primary font-bold">72.8777° E</div>
              </div>
              <span className="text-[8px] font-mono text-foreground/50 mt-3 uppercase tracking-wider">ISRO SpaceNet Locking</span>
            </div>

            {/* Combined Metrics Preview */}
            <div className="bg-[#112015] border border-emerald-500/20 rounded-3xl p-5 space-y-3 text-white flex flex-col justify-between">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Activity className="w-4.5 h-4.5 text-emerald-400" />
                <span className="font-extrabold text-xs uppercase tracking-wider">Spectral Growth</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-3xs font-extrabold uppercase mb-0.5">
                    <span>Canopy Index</span>
                    <span className="text-emerald-400">92.4%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-3xs font-extrabold uppercase mb-0.5">
                    <span>Carbon Offsets</span>
                    <span className="text-emerald-400">1.48 kg/hr</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
              <span className="text-[8px] text-white/45 italic leading-snug">Calculated dynamically via IoT nodes & satellite pixel arrays.</span>
            </div>

          </div>

          {/* GLASSMORPHIC LOCKED PREVIEW OVERLAY */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 z-20 bg-white/10 dark:bg-black/35 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-white/95 dark:bg-[#112015]/95 backdrop-blur-2xl border border-primary/20 dark:border-emerald-500/10 shadow-2xl rounded-[2rem] p-6 md:p-8 max-w-md w-full space-y-6 text-center relative overflow-hidden"
            >
              {/* Top Lock Badge */}
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-amber-500/15">
                <Lock className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight leading-snug">
                  We're building this!
                </h3>
                <p className="text-foreground/75 text-sm font-semibold leading-relaxed">
                  Our engineers are actively setting up ground sensor arrays and space-telemetry mapping. Want early access to watch your sapling grow in real-time? Plant a tree today to secure your spot in our upcoming beta queue!
                </p>
              </div>

              {/* Minimalist Action Button that redirects to Personalize/Pledge tree page */}
              <button
                type="button"
                onClick={handlePledgeAction}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl font-black text-xs md:text-sm shadow-lg shadow-emerald-500/25 hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Plant a Tree & Join Queue 🌲</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust statement */}
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-foreground/45 font-bold pt-1 border-t border-primary/5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Pledges directly fund native forest groves in authorized zones.</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}
