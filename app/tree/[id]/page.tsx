"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Share2, Download, Leaf, Droplets, Sun, Wind, CheckCircle2, Award, TreePine, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock tree default datasets
const DEFAULT_TREES: Record<string, any> = {
  "1": {
    id: "1",
    name: "The Guardian",
    type: "Banyan Tree",
    indianName: "Bargad",
    scientificName: "Ficus benghalensis",
    dedication: "For the future generations to breathe cleaner air.",
    location: "Western Ghats, Maharashtra",
    lat: 19.0760,
    lng: 72.8777,
    date: "Planted Oct 12, 2023",
    status: "GROWING",
    health: "Excellent",
    metrics: {
      co2: 8.5,
      water: 120,
      height: "1.2m",
    },
    updates: [
      {
        id: "u3",
        date: "Mar 15, 2024",
        title: "Spring Growth Spurt",
        message: "The Guardian has grown 20cm since the last update! The roots are establishing nicely.",
        image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800",
        aiInsight: "Based on leaf coloration, the tree is receiving optimal sunlight and nutrients.",
      },
      {
        id: "u2",
        date: "Jan 10, 2024",
        title: "First Leaves",
        message: "Despite the cooler season, small buds are appearing.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
        aiInsight: "Growth rate is in the 85th percentile for this species in this region.",
      },
      {
        id: "u1",
        date: "Oct 12, 2023",
        title: "Planting Day",
        message: "The sapling was successfully planted by our local team.",
        image: "https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&q=80&w=800",
        aiInsight: "Soil conditions are perfect. Moisture level at 65%.",
      }
    ]
  },
  "2": {
    id: "2",
    name: "For Mom",
    type: "Peepal Tree",
    indianName: "Peepal",
    scientificName: "Ficus religiosa",
    dedication: "Dedicated to the mother who nurtured me like soil.",
    location: "Himalayas, Uttarakhand",
    lat: 30.0668,
    lng: 79.0193,
    date: "Planted May 22, 2025",
    status: "MATURE",
    health: "Vibrant",
    metrics: {
      co2: 45.2,
      water: 310,
      height: "3.4m",
    },
    updates: [
      {
        id: "u21",
        date: "Apr 01, 2026",
        title: "Vigorous Crown Growth",
        message: "Crown expansion is highly active. Rustling leaves are absorbing maximum particulate dust.",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800",
        aiInsight: "Excellent chlorophyll density registered under spectral scan.",
      },
      {
        id: "u22",
        date: "May 22, 2025",
        title: "Inauguration Day",
        message: "Planted in soil enriched with organic humus.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
        aiInsight: "High earthworm density in local plot ensures swift root lock.",
      }
    ]
  }
};

export default function TreeDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const treeId = resolvedParams.id;

  const [tree, setTree] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("timeline");

  useEffect(() => {
    // Check local storage or fallback to defaults
    if (treeId.startsWith("custom_")) {
      const stored = localStorage.getItem("urban_forest_user_trees");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const found = parsed.find((t: any) => t.id === treeId);
          if (found) {
            // Generate standard custom tree statistics & updates dynamically!
            const customTreeData = {
              ...found,
              health: "Optimal",
              metrics: {
                co2: found.co2Offset || 15.0,
                water: found.quantity * 12,
                height: "Sapling stage",
              },
              updates: [
                {
                  id: "custom_u1",
                  date: found.date,
                  title: "Pledge Locked & Allocated",
                  message: `Reforestation interest recorded for ${found.quantity} ${found.type}(s). Local coordinators have geo-mapped coordinates in our regional database.`,
                  image: found.image || "https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&q=80&w=800",
                  aiInsight: "Local forester scheduled to sow the seed-bed and smart-tag this grove in the upcoming monsoon cycle.",
                }
              ]
            };
            setTree(customTreeData);
          }
        } catch (err) {
          console.error("Error reading custom tree", err);
        }
      }
    } else {
      setTree(DEFAULT_TREES[treeId] || DEFAULT_TREES["1"]);
    }
  }, [treeId]);

  if (!tree) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-foreground/60 text-sm font-medium">Retrieving tree journey...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-emerald-50/20 dark:to-emerald-950/10 pb-24">
      {/* Hero Header */}
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image 
          src={tree.updates[0]?.image || tree.image} 
          alt="Tree Hero" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-20 flex justify-between items-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors bg-black/35 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 text-xs md:text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-black/35 hover:bg-emerald-500/25 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
              <Share2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-4xl mx-auto px-4 pb-8 md:pb-12 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/90 text-white text-3xs font-extrabold rounded-full mb-3 uppercase tracking-widest border border-emerald-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              {tree.status}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-sm">{tree.name}</h1>
            <p className="text-white/95 text-xs md:text-sm font-medium flex items-center gap-2 flex-wrap">
              <TreePine className="w-4 h-4 text-emerald-400" /> {tree.type} {tree.indianName ? `(${tree.indianName})` : ""}
              <span>•</span>
              <MapPin className="w-4 h-4 text-emerald-400" /> {tree.location}
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats and Tabs */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white/80 dark:bg-[#112015] backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-primary/10">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-primary/10 text-center">
            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/20 rounded-2xl border border-primary/5">
              <Wind className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
              <p className="text-3xs text-foreground/50 font-bold uppercase tracking-wider">CO₂ Offset</p>
              <p className="text-lg md:text-xl font-black text-foreground mt-0.5">{tree.metrics.co2} kg</p>
            </div>
            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/20 rounded-2xl border border-primary/5">
              <Droplets className="w-6 h-6 text-teal-500 mx-auto mb-1.5" />
              <p className="text-3xs text-foreground/50 font-bold uppercase tracking-wider">Water Fed</p>
              <p className="text-lg md:text-xl font-black text-foreground mt-0.5">{tree.metrics.water} L</p>
            </div>
            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/20 rounded-2xl border border-primary/5">
              <Leaf className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
              <p className="text-3xs text-foreground/50 font-bold uppercase tracking-wider">Height</p>
              <p className="text-lg md:text-xl font-black text-foreground mt-0.5">{tree.metrics.height}</p>
            </div>
            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/20 rounded-2xl border border-primary/5">
              <Sun className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
              <p className="text-3xs text-foreground/50 font-bold uppercase tracking-wider">Health Vibe</p>
              <p className="text-lg md:text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{tree.health}</p>
            </div>
          </div>

          {/* Dedication Banner */}
          <div className="mb-8">
            <div className="bg-emerald-500/5 dark:bg-emerald-950/20 p-5 md:p-6 rounded-2xl italic text-foreground/80 border-l-4 border-emerald-500 text-xs md:text-sm font-medium">
              &quot;{tree.dedication}&quot;
            </div>
          </div>

          {/* Beautiful Sliding Tab Buttons */}
          <div className="flex border-b border-primary/10 mb-8 gap-4">
            <button 
              onClick={() => setActiveTab("timeline")}
              className={`pb-4 px-4 font-bold text-sm md:text-base border-b-3 transition-colors ${
                activeTab === "timeline" ? "border-emerald-500 text-primary dark:text-emerald-400" : "border-transparent text-foreground/40 hover:text-foreground"
              }`}
            >
              Growth Timeline
            </button>
            <button 
              onClick={() => setActiveTab("certificate")}
              className={`pb-4 px-4 font-bold text-sm md:text-base border-b-3 transition-colors ${
                activeTab === "certificate" ? "border-emerald-500 text-primary dark:text-emerald-400" : "border-transparent text-foreground/40 hover:text-foreground"
              }`}
            >
              Smart Plaque
            </button>
          </div>

          {/* Timeline Tab Content */}
          {activeTab === "timeline" && (
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500/10">
              {tree.updates.map((update: any, idx: number) => (
                <motion.div 
                  key={update.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 relative"
                >
                  {/* Timeline Node Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#122216] border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-md shrink-0 z-10">
                    {idx === 0 ? <Sparkles className="w-5 h-5 animate-pulse" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  
                  {/* Timeline Card */}
                  <div className="flex-1 bg-white/50 dark:bg-emerald-950/10 p-5 md:p-6 rounded-[1.5rem] border border-primary/5 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className="font-extrabold text-base md:text-lg text-foreground leading-tight">{update.title}</h4>
                      <time className="text-3xs font-extrabold text-primary bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider w-fit">{update.date}</time>
                    </div>
                    
                    <div className="relative w-full h-44 md:h-56 rounded-2xl overflow-hidden shadow-inner border border-primary/5">
                      <Image 
                        src={update.image} 
                        alt={update.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-medium">{update.message}</p>
                    
                    {/* Premium Forester AI Advice */}
                    <div className="bg-emerald-500/5 dark:bg-emerald-950/20 p-4 rounded-xl text-xs flex gap-3 border border-emerald-500/5">
                      <span className="text-xl shrink-0">🤖</span>
                      <div>
                        <p className="font-extrabold text-emerald-700 dark:text-emerald-400 mb-0.5">Forester AI Insight</p>
                        <p className="text-foreground/70 leading-relaxed font-medium">{update.aiInsight}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certificate Tab */}
          {activeTab === "certificate" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#fafcfa] dark:bg-emerald-950/10 border-4 border-dashed border-emerald-500/30 p-6 md:p-12 text-center rounded-[2rem] relative overflow-hidden shadow-inner"
            >
              <div className="absolute -top-10 -right-10 text-emerald-500/5 pointer-events-none">
                <Award className="w-56 h-56" />
              </div>

              <div className="space-y-6 max-w-lg mx-auto relative z-10">
                <span className="text-3xl bg-white dark:bg-[#122216] w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-md border border-primary/5">🌳</span>
                
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-serif text-emerald-800 dark:text-emerald-300 font-extrabold uppercase tracking-widest">Certificate of Planting</h2>
                  <p className="text-3xs text-foreground/45 uppercase tracking-widest font-black">Shunya Carbon Alliance of India</p>
                </div>
                
                <p className="text-foreground/60 text-xs italic font-serif">This certifies that digital smart plaque is dedicated to</p>
                
                <h3 className="text-2xl md:text-3xl font-black text-foreground border-b border-primary/10 pb-4 inline-block">&quot;{tree.name}&quot;</h3>
                
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                  Allocating species <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">{tree.type}</strong> ({tree.scientificName}) in <strong className="text-foreground">{tree.location}</strong> on the registered date of <strong className="text-foreground">{tree.date}</strong>.
                </p>

                <div className="pt-6 grid grid-cols-2 gap-8 border-t border-primary/10 max-w-sm mx-auto">
                  <div className="text-center">
                    <div className="h-0.5 bg-foreground/30 mb-2 w-24 mx-auto" />
                    <p className="text-3xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Urban Forest India</p>
                  </div>
                  <div className="text-center">
                    <div className="h-0.5 bg-foreground/30 mb-2 w-24 mx-auto" />
                    <p className="text-3xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Planting Partner</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
