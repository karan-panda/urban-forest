"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Share2, Download, Leaf, Droplets, Sun, Wind, CheckCircle2, Award, TreePine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock tree detail data
const TREE_DATA = {
  id: "1",
  name: "The Guardian",
  type: "Banyan Tree",
  dedication: "For the future generations to breathe cleaner air.",
  location: "Western Ghats, Maharashtra",
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
};

export default function TreeDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState("timeline");

  const tree = TREE_DATA; 

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image 
          src={tree.updates[0].image} 
          alt="Tree Hero" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-0 left-0 w-full p-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex justify-between items-end">
              <div className="text-white">
                <div className="inline-block px-3 py-1 bg-primary text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  {tree.status}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{tree.name}</h1>
                <p className="text-white/80 text-lg flex items-center gap-2">
                  <TreePine className="w-5 h-5" /> {tree.type} &nbsp;•&nbsp; <MapPin className="w-5 h-5" /> {tree.location}
                </p>
              </div>
              
              <div className="hidden md:flex gap-3">
                <button className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-[#152418] rounded-3xl shadow-xl p-8 border border-border/50">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-border/50">
            <div className="text-center">
              <Wind className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-foreground/60 font-medium">CO₂ Offset</p>
              <p className="text-xl font-bold">{tree.metrics.co2} kg</p>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 text-teal-500 mx-auto mb-2" />
              <p className="text-sm text-foreground/60 font-medium">Water Retained</p>
              <p className="text-xl font-bold">{tree.metrics.water} L</p>
            </div>
            <div className="text-center">
              <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground/60 font-medium">Current Height</p>
              <p className="text-xl font-bold">{tree.metrics.height}</p>
            </div>
            <div className="text-center">
              <Sun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-foreground/60 font-medium">Health Status</p>
              <p className="text-xl font-bold">{tree.health}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-accent/20 p-6 rounded-2xl italic text-foreground/80 border-l-4 border-primary">
              &quot;{tree.dedication}&quot;
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border/50 mb-8">
            <button 
              onClick={() => setActiveTab("timeline")}
              className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${activeTab === "timeline" ? "border-primary text-primary" : "border-transparent text-foreground/50 hover:text-foreground"}`}
            >
              Growth Timeline
            </button>
            <button 
              onClick={() => setActiveTab("certificate")}
              className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${activeTab === "certificate" ? "border-primary text-primary" : "border-transparent text-foreground/50 hover:text-foreground"}`}
            >
              Certificate
            </button>
          </div>

          {/* Timeline Content */}
          {activeTab === "timeline" && (
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {tree.updates.map((update, idx) => (
                <motion.div 
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white dark:bg-[#152418] p-6 rounded-2xl border border-border/50 shadow-sm group-hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{update.title}</h4>
                      <time className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">{update.date}</time>
                    </div>
                    <div className="relative w-full h-48 mb-4">
                      <Image 
                        src={update.image} 
                        alt={update.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <p className="text-foreground/70 mb-4">{update.message}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-xl text-sm flex gap-3">
                      <div className="text-2xl">🤖</div>
                      <div>
                        <p className="font-bold text-blue-900 mb-1">AI Growth Insight</p>
                        <p className="text-blue-800/80">{update.aiInsight}</p>
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-white dark:bg-[#152418] border-8 border-double border-secondary/30 p-12 text-center rounded-xl relative"
            >
              <div className="absolute top-4 right-4 text-secondary/20">
                <Award className="w-32 h-32" />
              </div>
              <h2 className="text-3xl font-serif text-secondary mb-2 uppercase tracking-widest">Certificate of Planting</h2>
              <p className="text-foreground/60 mb-8 italic">This certifies that</p>
              
              <h3 className="text-4xl font-bold text-foreground mb-8">&quot;{tree.name}&quot;</h3>
              
              <p className="text-lg text-foreground/80 max-w-lg mx-auto mb-12">
                A {tree.type} was successfully planted in {tree.location} on {tree.date}.
              </p>
              
              <div className="flex justify-center gap-12 pt-8 border-t border-border/50">
                <div>
                  <div className="w-32 border-b-2 border-foreground/80 mb-2"></div>
                  <p className="text-sm font-bold text-secondary">Urban Forest Org.</p>
                </div>
                <div>
                  <div className="w-32 border-b-2 border-foreground/80 mb-2"></div>
                  <p className="text-sm font-bold text-secondary">Local Partner</p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
