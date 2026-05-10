"use client";

import { motion } from "framer-motion";
import { TreePine, MapPin, Calendar, Award, Droplets, Wind, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data
const MY_TREES = [
  {
    id: "1",
    name: "The Guardian",
    type: "Banyan Tree",
    location: "Western Ghats, Maharashtra",
    date: "Planted 2 months ago",
    status: "GROWING",
    co2Offset: 8.5, // kg
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "2",
    name: "For Mom",
    type: "Peepal Tree",
    location: "Himalayas, Uttarakhand",
    date: "Planted 1 year ago",
    status: "MATURE",
    co2Offset: 45.2, // kg
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Forest Dashboard</h1>
            <p className="text-foreground/60 text-lg">Track your trees and monitor your environmental impact.</p>
          </div>
          <Link 
            href="/personalize" 
            className="px-6 py-3 bg-primary text-white rounded-full font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto"
          >
            <TreePine className="w-5 h-5" /> Plant Another Tree
          </Link>
        </div>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <ImpactCard icon={<TreePine />} label="Total Trees" value="2" color="bg-primary/10 text-primary" />
          <ImpactCard icon={<Wind />} label="CO₂ Offset" value="53.7 kg" color="bg-blue-500/10 text-blue-500" />
          <ImpactCard icon={<Droplets />} label="Rainwater Retained" value="120 L" color="bg-teal-500/10 text-teal-500" />
          <ImpactCard icon={<Award />} label="Current Level" value="Forest Guide" color="bg-orange-500/10 text-orange-500" />
        </div>

        {/* Trees Grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Your Planted Trees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MY_TREES.map((tree, idx) => (
            <motion.div 
              key={tree.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-[#152418] rounded-3xl overflow-hidden shadow-lg border border-border/50 group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {tree.status}
                </div>
                <Image 
                  src={tree.image} 
                  alt={tree.name} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{tree.name}</h3>
                    <p className="text-primary font-medium text-sm">{tree.type}</p>
                  </div>
                  <div className="bg-accent/30 text-primary font-bold px-3 py-1 rounded-lg text-sm">
                    {tree.co2Offset} kg CO₂
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-foreground/60 gap-2">
                    <MapPin className="w-4 h-4" /> {tree.location}
                  </div>
                  <div className="flex items-center text-sm text-foreground/60 gap-2">
                    <Calendar className="w-4 h-4" /> {tree.date}
                  </div>
                </div>

                <Link 
                  href={`/tree/${tree.id}`}
                  className="w-full py-3 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  View Journey <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Empty Slot */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: MY_TREES.length * 0.1 }}
            className="bg-accent/10 border-2 border-dashed border-accent/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] hover:bg-accent/20 transition-colors cursor-pointer"
            onClick={() => window.location.href = '/personalize'}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <TreePine className="w-8 h-8 text-primary/50" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Expand Your Forest</h3>
            <p className="text-foreground/60 text-sm mb-6 max-w-[200px]">Plant another tree to increase your environmental impact.</p>
            <span className="text-primary font-bold">Plant a Tree</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ImpactCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white dark:bg-[#152418] p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-foreground/60 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
