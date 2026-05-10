"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Globe2, Heart, Award } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <motion.section 
        ref={targetRef}
        style={{ opacity, scale }}
        className="relative min-h-[90vh] flex items-center justify-center pt-16"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 font-medium"
          >
            <Leaf className="w-4 h-4" />
            <span>Join 10,000+ forest builders today</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Plant a Tree, <br className="hidden md:block" />
            Track Its Life, <span className="text-primary">Leave a Legacy.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-10"
          >
            The platform that allows you to plant real trees in real locations, track their growth with AI, and make a measurable impact on the planet.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/personalize" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Planting <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-lg font-bold hover:bg-secondary/20 transition-all flex items-center justify-center"
            >
              View Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* IMPACT METRICS SECTION */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricCard 
              icon={<Leaf className="w-8 h-8 text-primary" />}
              value="45,231"
              label="Trees Planted"
              delay={0.1}
            />
            <MetricCard 
              icon={<Globe2 className="w-8 h-8 text-primary" />}
              value="1.2M kg"
              label="CO₂ Absorbed"
              delay={0.3}
            />
            <MetricCard 
              icon={<Heart className="w-8 h-8 text-primary" />}
              value="12,450"
              label="Active Contributors"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / VALUE PROPOSITION */}
      <section className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How Urban Forest Works</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">From a simple click to a fully grown tree. Here is how you can make a difference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              number="01"
              title="Personalize Your Tree"
              desc="Choose the tree type, select a real-world location on our map, and add a special dedication or name."
            />
            <FeatureCard 
              number="02"
              title="Watch It Grow"
              desc="Receive periodic photo updates and AI-generated growth predictions directly on your personal dashboard."
            />
            <FeatureCard 
              number="03"
              title="Measure Your Impact"
              desc="Track the amount of CO₂ your tree is offsetting and earn gamified badges as your forest expands."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Real Impact. Real Stories.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard 
              quote="I planted a Maple for my daughter's first birthday. Getting photo updates of the tree growing alongside her is the most incredible experience."
              author="Akshay Purohit"
              role="Forest Builder Level 4"
            />
            <TestimonialCard 
              quote="The transparent tracking and the beautiful UI make it so rewarding to contribute. Our company has planted over 500 trees so far!"
              author="David Xavier"
              role="Corporate Partner"
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Award className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to leave your legacy?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Join our community today. It only takes 2 minutes to plant a tree that will live for generations.
          </p>
          <Link 
            href="/personalize" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform"
          >
            Plant Your First Tree <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-[#152418] rounded-3xl p-8 shadow-xl shadow-border/50 border border-border/50 text-center flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-4xl font-black text-foreground mb-2">{value}</h3>
      <p className="text-foreground/60 font-medium">{label}</p>
    </motion.div>
  );
}

function FeatureCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#152418] p-8 rounded-3xl shadow-lg border border-border/50 relative overflow-hidden group"
    >
      <div className="text-8xl font-black text-border/40 absolute -top-4 -right-4 transition-transform group-hover:scale-110 group-hover:text-primary/10">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10 pt-8">{title}</h3>
      <p className="text-foreground/70 relative z-10 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-accent/20 p-10 rounded-3xl border border-accent/40"
    >
      <div className="mb-6 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Heart key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-xl italic text-foreground mb-8">"{quote}"</p>
      <div>
        <h4 className="font-bold text-foreground text-lg">{author}</h4>
        <p className="text-foreground/60">{role}</p>
      </div>
    </motion.div>
  );
}
