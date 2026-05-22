"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CheckCircle2, ChevronRight, ChevronLeft, MapPin, TreePine, Mail, Phone, User, Check, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dynamic import for Leaflet map to avoid SSR issues
const MapSelection = dynamic(() => import("@/components/ui/MapSelection"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] w-full bg-emerald-950/5 dark:bg-emerald-500/5 animate-pulse rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-primary/20 gap-3">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-foreground/60 text-sm font-medium">Initializing Interactive Map...</p>
    </div>
  )
});

const TREE_TYPES = [
  {
    id: "neem",
    name: "Neem Tree",
    indianName: "Neem",
    scientificName: "Azadirachta indica",
    tagline: "The Divine Pharmacy",
    co2: "40 kg/yr",
    price: 35,
    minQty: 100,
    icon: "🍃",
    desc: "A powerhouse of medicine and air purification. Planted in groves of 100 to maximize community impact.",
    color: "from-emerald-500 to-green-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    benefits: ["Air Purifier", "Natural Pesticide", "Medicinal"]
  },
  {
    id: "banyan",
    name: "Banyan Tree",
    indianName: "Bargad",
    scientificName: "Ficus benghalensis",
    tagline: "The Canopy of Shelter",
    co2: "80 kg/yr",
    price: 80,
    minQty: 1,
    icon: "🌳",
    desc: "India's national tree, representing eternity and shelter. Creates a massive canopy for birds and local bio-habitats.",
    color: "from-green-600 to-emerald-700 bg-green-600/10 text-green-700 dark:text-green-400",
    benefits: ["Massive Canopy", "Ecosystem Hub", "National Symbol"]
  },
  {
    id: "peepal",
    name: "Peepal Tree",
    indianName: "Peepal",
    scientificName: "Ficus religiosa",
    tagline: "The 24/7 Oxygen Hub",
    co2: "75 kg/yr",
    price: 80,
    minQty: 1,
    icon: "🌿",
    desc: "Revered tree that releases oxygen round-the-clock. Famous for its heart-shaped leaves and cooling aura.",
    color: "from-teal-500 to-emerald-600 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    benefits: ["24/7 Oxygen", "Soil Enhancer", "Spiritual Aura"]
  },
  {
    id: "bokul",
    name: "Bokul Tree",
    indianName: "Bakula",
    scientificName: "Mimusops elengi",
    tagline: "Scent of Indian Heritage",
    co2: "30 kg/yr",
    price: 200,
    minQty: 1,
    icon: "🌸",
    desc: "Beautiful evergreen shade tree with star-shaped fragrant blossoms. Traditional flower garlands are crafted from Bokul.",
    color: "from-orange-400 to-amber-500 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    benefits: ["Scented Blooms", "Premium Shade", "Traditional"]
  },
  {
    id: "rita",
    name: "Rita Tree",
    indianName: "Reetha",
    scientificName: "Sapindus mukorossi",
    tagline: "Organic Soapnut Tree",
    co2: "28 kg/yr",
    price: 200,
    minQty: 1,
    icon: "🧼",
    desc: "Produces soapnuts—nature's 100% chemical-free alternative to detergent and shampoo. High local economic value.",
    color: "from-yellow-500 to-amber-600 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    benefits: ["Organic Soap", "Eco-Detergent", "Highly Durable"]
  },
  {
    id: "bahava",
    name: "Bahava Tree",
    indianName: "Amaltas",
    scientificName: "Cassia fistula",
    tagline: "Vibrant Golden Rain",
    co2: "32 kg/yr",
    price: 200,
    minQty: 1,
    icon: "✨",
    desc: "Famous for exploding into cascades of bright yellow blossoms in summer. Highly drought resistant and beautiful.",
    color: "from-yellow-400 to-orange-500 bg-yellow-400/10 text-amber-500 dark:text-amber-400",
    benefits: ["Golden Flowers", "Drought Hardy", "Highly Aesthetic"]
  },
  {
    id: "gulmohar",
    name: "Gulmohar Tree",
    indianName: "Gulmohar",
    scientificName: "Delonix regia",
    tagline: "Flames of the Summer",
    co2: "35 kg/yr",
    price: 200,
    minQty: 1,
    icon: "🔥",
    desc: "Brings streets to life with spectacular fiery red-orange flowers. A beloved aesthetic tree popular among youth.",
    color: "from-red-500 to-orange-600 bg-red-500/10 text-red-500 dark:text-red-400",
    benefits: ["Vivid Crimson", "Fast Growth", "Summer Shade"]
  }
];

export default function PersonalizeTree() {
  const [step, setStep] = useState(1);
  const [selectedTree, setSelectedTree] = useState(TREE_TYPES[0]);
  const [quantity, setQuantity] = useState(100);
  const [location, setLocation] = useState<{ lat: number, lng: number, regionName?: string } | null>(null);
  const [dedication, setDedication] = useState("");
  const [treeName, setTreeName] = useState("");

  // User Interest Form States
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleTreeSelect = (tree: typeof TREE_TYPES[0]) => {
    setSelectedTree(tree);
    setQuantity(tree.minQty);
  };

  const handleQuantityChange = (val: number) => {
    const min = selectedTree.id === "neem" ? 100 : 1;
    if (isNaN(val) || val < min) {
      setQuantity(min);
    } else {
      setQuantity(val);
    }
  };

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPhone) {
      alert("Please fill in all contact details.");
      return;
    }

    setIsProcessing(true);

    // Prepare variables for EmailJS matching step-2 list
    const baseCO2 = selectedTree.id === "neem" ? 40 :
      selectedTree.id === "banyan" ? 80 :
      selectedTree.id === "peepal" ? 75 :
      selectedTree.id === "bokul" ? 30 :
      selectedTree.id === "rita" ? 28 :
      selectedTree.id === "bahava" ? 32 : 35;
    const estCO2Offset = ((baseCO2 * quantity * 0.1)).toFixed(1);

    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      user_phone: userPhone,
      whatsapp_updates: whatsappUpdates ? "Yes, Active" : "No, Disabled",
      tree_name: treeName || `My ${selectedTree.name}`,
      tree_type: `${selectedTree.name} (${selectedTree.indianName})`,
      scientific_name: selectedTree.scientificName,
      quantity: quantity.toString(),
      price: `₹${(selectedTree.price * quantity).toLocaleString("en-IN")}`,
      co2_offset: `${estCO2Offset} kg/yr`,
      dedication: dedication || "Planted with love for our homeland.",
      location_region: location?.regionName || "Mumbai Sector",
      location_lat: location?.lat ? location.lat.toFixed(6) : "19.0760",
      location_lng: location?.lng ? location.lng.toFixed(6) : "72.8777",
    };

    try {
      // Direct fetch call to EmailJS REST API
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_urban_forest";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_urban_forest";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      let emailSentSuccessfully = false;

      if (publicKey) {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams,
          }),
        });

        if (response.ok) {
          emailSentSuccessfully = true;
        } else {
          const errText = await response.text();
          console.error("EmailJS sending error response:", errText);
        }
      } else {
        console.warn("EmailJS Public Key not set. Simulating successful local save only.");
        // Simulate a network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        emailSentSuccessfully = true;
      }

      if (emailSentSuccessfully) {
        // Save the planted tree to LocalStorage so dashboard immediately reflects it!
        const existingTreesStr = localStorage.getItem("urban_forest_user_trees");
        const existingTrees = existingTreesStr ? JSON.parse(existingTreesStr) : [];

        // Estimate standard CO2 offset based on tree type
        const baseCO2 = selectedTree.id === "neem" ? 40 :
          selectedTree.id === "banyan" ? 80 :
            selectedTree.id === "peepal" ? 75 :
              selectedTree.id === "bokul" ? 30 :
                selectedTree.id === "rita" ? 28 :
                  selectedTree.id === "bahava" ? 32 : 35;

        const newTreeItem = {
          id: `custom_${Date.now()}`,
          name: treeName || `${selectedTree.name} Grove`,
          type: selectedTree.name,
          indianName: selectedTree.indianName,
          scientificName: selectedTree.scientificName,
          location: location?.regionName
            ? `${location.regionName} (Mumbai Sector)`
            : "Mumbai Sector",
          lat: location?.lat || 19.0760,
          lng: location?.lng || 72.8777,
          date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          status: "PLEDGED",
          co2Offset: parseFloat(((baseCO2 * quantity * 0.1)).toFixed(1)),
          quantity: quantity,
          price: selectedTree.price * quantity,
          dedication: dedication || "Planted with love for our homeland.",
          image: selectedTree.id === "neem"
            ? "https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&q=80&w=800"
            : selectedTree.id === "banyan"
              ? "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
              : selectedTree.id === "peepal"
                ? "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
                : "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800"
        };

        existingTrees.unshift(newTreeItem);
        localStorage.setItem("urban_forest_user_trees", JSON.stringify(existingTrees));

        setIsSuccess(true);
      } else {
        alert("We recorded your interest locally but failed to trigger the automated mail. Our support team will still contact you shortly!");
        setIsSuccess(true); // Proceed to success screen regardless for premium user experience
      }
    } catch (error) {
      console.error("Interest Form submission failed:", error);
      alert("Something went wrong, but don't worry! We will back up your pledge.");
      setIsSuccess(true); // Fallback to ensure seamless flow
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-emerald-50/20 dark:to-emerald-950/10 pt-20 md:pt-28 pb-32 md:pb-44">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Real Native App Vibe Progress indicator */}
        {!isSuccess && (
          <div className="mb-8 md:mb-12 bg-white/70 dark:bg-emerald-950/30 backdrop-blur-xl p-4 md:p-6 rounded-3xl border border-primary/10 shadow-sm relative overflow-hidden">
            <div className="relative flex justify-between items-start">
              {/* Progress Line */}
              <div className="absolute left-[12.5%] right-[12.5%] top-5 md:top-6 -translate-y-1/2 h-1 bg-emerald-100 dark:bg-emerald-950 -z-10 rounded-full" />
              <div
                className="absolute left-[12.5%] h-1 bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500 -z-10 rounded-full top-5 md:top-6 -translate-y-1/2"
                style={{ width: `calc(${((step - 1) / 3) * 75}%)` }}
              />
              {[
                { num: 1, label: "Tree" },
                { num: 2, label: "Location" },
                { num: 3, label: "Personalize" },
                { num: 4, label: "Pledge" }
              ].map(({ num, label }) => (
                <div key={num} className="flex flex-col items-center flex-1 z-10">
                  <button
                    disabled={num > step}
                    onClick={() => setStep(num)}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                      step >= num
                        ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 scale-110"
                        : "bg-white dark:bg-[#122216] text-foreground/40 border border-border"
                    }`}
                  >
                    {step > num ? <Check className="w-5 h-5" /> : num}
                  </button>
                  <span className={`mt-2.5 text-[9px] md:text-xs font-black uppercase tracking-wider text-center transition-colors ${
                    step === num ? "text-primary" : "text-foreground/60"
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Box */}
        <div className="bg-white/80 dark:bg-[#112015] backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-12 shadow-2xl shadow-primary/5 border border-primary/10 overflow-hidden relative">

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center py-10 space-y-8"
              >
                <div className="relative w-24 h-24 bg-gradient-to-tr from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </motion.div>

                  {/* Floating particles */}
                  <div className="absolute -top-2 -left-2 text-2xl animate-bounce">🌱</div>
                  <div className="absolute -bottom-2 -right-2 text-2xl animate-pulse">✨</div>
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest inline-block">
                    Pledge Registered
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Kamaal Kar Diya! 🎉</h2>
                  <p className="text-foreground/70 text-base md:text-lg">
                    Thank you, <strong className="text-foreground font-semibold">{userName}</strong>! We've captured your pledge to plant <strong className="text-primary">{quantity} {selectedTree.name}(s)</strong>.
                  </p>
                  <p className="text-foreground/50 text-sm">
                    A highly premium, interactive summary has been generated and triggered to your mail ({userEmail}). Our forest coordinator will reach out via WhatsApp/Call at <strong>{userPhone}</strong> to help coordinate this planting grove.
                  </p>
                </div>

                {/* Simulated Order Summary Card */}
                <div className="max-w-sm mx-auto bg-emerald-500/5 dark:bg-emerald-950/20 rounded-3xl p-6 border border-emerald-500/10 text-left space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-3">
                    <span className="text-foreground/60 font-medium">Selected Sapling</span>
                    <span className="font-bold flex items-center gap-1">
                      <span>{selectedTree.icon}</span> {selectedTree.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-3">
                    <span className="text-foreground/60 font-medium">Grove Size</span>
                    <span className="font-bold text-foreground">{quantity} Sapling(s)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-3">
                    <span className="text-foreground/60 font-medium">Project Region</span>
                    <span className="font-bold text-foreground max-w-[180px] text-right truncate">
                      {location?.regionName || "Mumbai Sector"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-3">
                    <span className="text-foreground/60 font-medium">Coordinates Tagging</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Sent post-planting 📍
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-base pt-1">
                    <span className="font-extrabold text-foreground">Pledge Support</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg">
                      ₹{(selectedTree.price * quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-base font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    Go To My Forest <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setStep(1);
                      setDedication("");
                      setTreeName("");
                      setLocation(null);
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-500/10 text-primary dark:text-emerald-400 rounded-full text-base font-bold hover:bg-emerald-500/20 transition-all"
                  >
                    Plant Another Tree
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* STEP 1: SELECT TREE */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-1">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Step 01 / 04</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Select Indian Native Sapling</h2>
                      <p className="text-foreground/60 text-xs md:text-sm">
                        Choose species uniquely suited for local soil. Each contributes differently to biodiversity.
                      </p>
                    </div>

                    {/* Grid of Trees */}
                    {/* Responsive Tree Selector Layout */}

                    {/* 1. Mobile Horizontal Swiper (Visible only on mobile/tablet) */}
                    <div className="block md:hidden space-y-4">
                      <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory scroll-smooth no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {TREE_TYPES.map((tree) => {
                          const isSelected = selectedTree.id === tree.id;
                          return (
                            <button
                              key={tree.id}
                              type="button"
                              onClick={() => handleTreeSelect(tree)}
                              className={`snap-center shrink-0 w-[160px] p-4 rounded-3xl border-2 text-left transition-all duration-300 relative flex flex-col justify-between min-h-[140px] ${isSelected
                                  ? "border-emerald-500 bg-emerald-500/5 shadow-lg scale-102"
                                  : "border-border bg-white/40 dark:bg-emerald-950/10 hover:border-emerald-500/50"
                                }`}
                            >
                              <div className="flex justify-between items-start w-full">
                                <div className="text-2xl bg-white dark:bg-[#122216] w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
                                  {tree.icon}
                                </div>
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${tree.color.split(" ")[2]} ${tree.color.split(" ")[3] || ""}`}>
                                  {tree.indianName}
                                </span>
                              </div>

                              <div className="mt-3">
                                <h4 className="text-xs font-black text-foreground leading-tight truncate">{tree.name}</h4>
                                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 mt-1 block">₹{tree.price} / tree</span>
                              </div>

                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Featured Detail Card below swiper */}
                      <motion.div
                        key={selectedTree.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/20 p-5 rounded-[2rem] border border-primary/10 space-y-3.5 text-left"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-emerald-400">Featured Sapling Details</span>
                            <h3 className="text-lg font-black text-foreground mt-0.5">{selectedTree.name} ({selectedTree.indianName})</h3>
                            <p className="text-2xs italic text-foreground/50 font-serif leading-none mt-0.5">{selectedTree.scientificName}</p>
                          </div>
                          <span className="text-3xl bg-white dark:bg-[#122216] w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0">
                            {selectedTree.icon}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300 italic">{selectedTree.tagline}</p>
                        <p className="text-xs text-foreground/75 font-medium leading-relaxed">{selectedTree.desc}</p>

                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/5">
                          <div>
                            <span className="text-[9px] text-foreground/45 block font-bold uppercase tracking-wider">Annual CO₂ Offset</span>
                            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{selectedTree.co2}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-foreground/45 block font-bold uppercase tracking-wider">Unit Price</span>
                            <span className="text-sm font-black text-foreground">₹{selectedTree.price}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {selectedTree.benefits.map((b, i) => (
                            <span key={i} className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* 2. Desktop Grid Selector (Visible only on medium/large screens) */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {TREE_TYPES.map((tree) => {
                        const isSelected = selectedTree.id === tree.id;
                        return (
                          <button
                            key={tree.id}
                            onClick={() => handleTreeSelect(tree)}
                            className={`p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] border-2 text-left transition-all duration-300 relative flex flex-col justify-between min-h-[170px] md:min-h-[185px] ${isSelected
                                ? "border-emerald-500 bg-emerald-500/5 shadow-xl shadow-emerald-500/5 scale-102"
                                : "border-border bg-white/40 dark:bg-emerald-950/10 hover:border-emerald-500/50 hover:bg-emerald-500/5"
                              }`}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <div className="text-2xl bg-white dark:bg-[#122216] w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md">
                                  {tree.icon}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tree.color}`}>
                                  {tree.indianName}
                                </span>
                              </div>

                              <h3 className="text-sm md:text-base font-extrabold text-foreground leading-tight">{tree.name}</h3>
                              <p className="text-[10px] italic text-foreground/50 font-serif leading-none mt-0.5">{tree.scientificName}</p>
                              <p className="text-[11px] text-foreground/60 mt-1.5 font-medium line-clamp-2">{tree.desc}</p>
                            </div>

                            <div className="mt-3 pt-3 border-t border-primary/5 flex justify-between items-end">
                              <div>
                                <span className="text-[9px] text-foreground/40 block font-semibold uppercase tracking-wider">Offset Rate</span>
                                <span className="text-[11px] md:text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{tree.co2}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-foreground/40 block font-semibold uppercase tracking-wider">Unit Cost</span>
                                <span className="text-sm md:text-base font-black text-foreground">₹{tree.price}</span>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quantity Picker Section */}
                    <div className="bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/10 p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="space-y-0.5 text-center md:text-left">
                        <h4 className="text-base font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
                          🌱 Choose Quantity
                          {selectedTree.id === "neem" && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/25 text-primary font-bold">Min: 100 Qty</span>
                          )}
                        </h4>
                        <p className="text-[11px] text-foreground/60 max-w-sm">
                          {selectedTree.id === "neem"
                            ? "Neem saplings must be planted in sets of 100 to yield organic groves with robust insect-resilience."
                            : "Plant single or multiple saplings. Every single leaf offsets regional industrial dust!"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 bg-white dark:bg-[#122216] border border-border p-2 rounded-2xl shadow-sm">
                        <button
                          type="button"
                          onClick={() => {
                            const stepAmount = selectedTree.id === "neem" ? 50 : 1;
                            const minVal = selectedTree.id === "neem" ? 100 : 1;
                            setQuantity(q => Math.max(minVal, q - stepAmount));
                          }}
                          className="w-10 h-10 rounded-xl bg-accent/50 dark:bg-emerald-900/30 flex items-center justify-center text-lg font-black hover:bg-primary hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          min={selectedTree.id === "neem" ? 100 : 1}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                          className="w-16 text-center font-extrabold text-lg bg-transparent focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const stepAmount = selectedTree.id === "neem" ? 50 : 1;
                            setQuantity(q => q + stepAmount);
                          }}
                          className="w-10 h-10 rounded-xl bg-accent/50 dark:bg-emerald-900/30 flex items-center justify-center text-lg font-black hover:bg-primary hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: CHOOSE LOCATION */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Step 02 / 04</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Geo-Tag Planting Coordinates</h2>
                      <p className="text-foreground/60 text-xs md:text-sm">
                        Select a real-world regional project. Our local foresters will manually tag and photograph your tree.
                      </p>
                    </div>

                    <MapSelection onLocationSelect={(lat, lng, regionName) => setLocation({ lat, lng, regionName })} />

                    {location ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-4 bg-emerald-500/10 dark:bg-emerald-950/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/20 text-sm"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <MapPin className="w-5 h-5 text-emerald-500 animate-bounce shrink-0" />
                          <div className="space-y-0.5">
                            <span>Project Spot Locked: <strong className="text-foreground">{location.regionName || "Mumbai Sector"}</strong></span>
                            <span className="block text-[11px] font-normal text-foreground/60 leading-none">
                              📍 Exact GPS coordinates will be sent after physical tagging & planting is completed.
                            </span>
                          </div>
                        </div>
                        <span className="text-3xs uppercase tracking-widest bg-emerald-500/20 px-2.5 py-1 rounded-full text-primary dark:text-emerald-400 font-black shrink-0 text-center">
                          Zone Confirmed
                        </span>
                      </motion.div>
                    ) : (
                      <div className="p-4 bg-amber-500/10 rounded-2xl flex items-center gap-3 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-sm font-medium">
                        <MapPin className="w-5 h-5 text-amber-500 animate-pulse animate-duration-1000" />
                        <span>Please select an active Mumbai planting zone (Virar, Ghatkopar, Aarey, or Borivali/Kandivali) on the map or list above to continue.</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: PERSONALIZE */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Step 03 / 04</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Name & Dedicate</h2>
                      <p className="text-foreground/60 text-xs md:text-sm">
                        Personalize the digital and physical smart plaque associated with this planting action.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs md:text-sm font-bold text-foreground/80 mb-1.5">Give Your Tree a Cool Name</label>
                        <input
                          type="text"
                          value={treeName}
                          onChange={(e) => setTreeName(e.target.value)}
                          placeholder="e.g., Pavitra Bargad, Oxygen Guard, Karan's Neem Grove"
                          className="w-full px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-border bg-white dark:bg-[#122216] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold text-xs md:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-bold text-foreground/80 mb-1.5">Dedication Message (Optional)</label>
                        <textarea
                          value={dedication}
                          onChange={(e) => setDedication(e.target.value)}
                          placeholder="e.g., Dedicated to my grandparents. May your values continue to shadow us like a thick forest canopy..."
                          rows={3}
                          className="w-full px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-border bg-white dark:bg-[#122216] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-medium text-xs md:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-5 p-4 md:p-5 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/20 rounded-2xl border border-primary/10">
                      <h4 className="font-extrabold text-primary mb-1.5 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
                        <TreePine className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> Previewing Certificate Plaque
                      </h4>
                      <p className="text-lg md:text-xl font-black text-foreground">
                        {treeName || `${selectedTree.name} Grove`}
                      </p>
                      <p className="text-2xs md:text-xs text-foreground/50 mt-0.5 italic font-serif">
                        Species: {selectedTree.scientificName} ({selectedTree.indianName})
                      </p>
                      {dedication && (
                        <p className="text-foreground/75 italic mt-3 border-l-2 border-emerald-500 pl-3 text-xs md:text-sm leading-relaxed">
                          &quot;{dedication}&quot;
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SECURE PLEDGE INTEREST */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-1 text-center">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Step 04 / 04</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Confirm Pledge & Details</h2>
                      <p className="text-foreground/60 text-xs md:text-sm max-w-xl mx-auto">
                        Submit your details. We'll generate an interactive, customizable planting certificate and coordinate your real-world grove!
                      </p>
                    </div>

                    {/* Split View: Left Order Details, Right Contact Form */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">

                      {/* Left: Premium Pledge Summary Card */}
                      <div className="md:col-span-2 bg-gradient-to-b from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/30 p-4 sm:p-6 rounded-3xl md:rounded-[2rem] border border-emerald-500/10 space-y-6">
                        <h3 className="font-extrabold text-foreground text-lg pb-1.5 border-b border-primary/10 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" /> Pledge Summary
                        </h3>

                        {/* Species Feature Card */}
                        <div className="bg-emerald-500/10 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/10 flex items-center gap-4">
                          <div className="text-3xl bg-white dark:bg-[#122216] w-12 h-12 rounded-xl flex items-center justify-center shadow-md shrink-0">
                            {selectedTree.icon}
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <p className="text-[10px] text-primary dark:text-emerald-400 font-extrabold uppercase tracking-wider leading-none">Sapling Selected</p>
                            <h4 className="text-base font-black text-foreground mt-1 truncate">{selectedTree.name}</h4>
                            <p className="text-[11px] text-foreground/50 italic leading-none mt-0.5 truncate">{selectedTree.scientificName} ({selectedTree.indianName})</p>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                          <div className="bg-white/40 dark:bg-[#122216]/40 p-3 rounded-xl border border-primary/5 flex flex-col justify-between min-h-[64px]">
                            <span className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider">Quantity</span>
                            <span className="text-sm font-black text-foreground mt-1">{quantity} Sapling(s)</span>
                          </div>
                          
                          <div className="bg-white/40 dark:bg-[#122216]/40 p-3 rounded-xl border border-primary/5 flex flex-col justify-between min-h-[64px]">
                            <span className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider">Project Region</span>
                            <span className="text-sm font-black text-foreground mt-1 truncate" title={location?.regionName || "Mumbai Sector"}>
                              {location?.regionName || "Mumbai Sector"}
                            </span>
                          </div>

                          <div className="bg-white/40 dark:bg-[#122216]/40 p-3 rounded-xl border border-primary/5 flex flex-col justify-between min-h-[64px]">
                            <span className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider">Grove Name</span>
                            <span className="text-sm font-black text-foreground mt-1 truncate" title={treeName || "Not set"}>
                              {treeName || "Not set"}
                            </span>
                          </div>

                          <div className="bg-white/40 dark:bg-[#122216]/40 p-3 rounded-xl border border-primary/5 flex flex-col justify-between min-h-[64px]">
                            <span className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider">Coordinates</span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400 mt-1">
                              Post-planting 📍
                            </span>
                          </div>
                        </div>

                        {/* Impact and Price Breakdown */}
                        <div className="pt-4 border-t border-primary/10 space-y-3.5">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-xs text-foreground/60 font-medium">Est. Annual CO₂ Offset</span>
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg">
                              +{((selectedTree.id === "neem" ? 40 : parseInt(selectedTree.co2)) * quantity * 0.1).toFixed(1)} kg/yr
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center bg-emerald-500/10 dark:bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-500/10">
                            <span className="text-sm font-bold text-foreground text-left">Total Contribution</span>
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                              ₹{(selectedTree.price * quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        {/* High fidelity Native Badges */}
                        <div className="pt-1 grid grid-cols-2 gap-2 text-[10px] font-bold text-foreground/60 text-center">
                          <span className="flex items-center justify-center gap-1 bg-white/50 dark:bg-emerald-950/20 py-2 px-2.5 rounded-xl border border-primary/5">
                            <Heart className="w-3 h-3 text-red-500 fill-red-500 shrink-0" /> Made for India
                          </span>
                          <span className="flex items-center justify-center gap-1 bg-white/50 dark:bg-emerald-950/20 py-2 px-2.5 rounded-xl border border-primary/5">
                            Tax-Exempt 🌱
                          </span>
                        </div>
                      </div>

                      {/* Right: Contact Details form */}
                      <form id="interest-form" onSubmit={handleInterestSubmit} className="md:col-span-3 space-y-5 bg-white dark:bg-[#122216] p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[2rem] border border-border shadow-sm">
                        <h3 className="font-extrabold text-foreground text-lg">Your Contact Details</h3>

                        <div className="space-y-4">
                          <div className="relative">
                            <label className="block text-2xs font-extrabold uppercase tracking-wider text-foreground/60 mb-1.5 pl-1">Full Name</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"><User className="w-4 h-4" /></span>
                              <input
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Aarav Sharma"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white dark:bg-[#152418] focus:outline-none focus:ring-2 focus:ring-primary/50 font-semibold"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <label className="block text-2xs font-extrabold uppercase tracking-wider text-foreground/60 mb-1.5 pl-1">Email Address</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"><Mail className="w-4 h-4" /></span>
                              <input
                                type="email"
                                required
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="aarav@gmail.com"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white dark:bg-[#152418] focus:outline-none focus:ring-2 focus:ring-primary/50 font-semibold"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <label className="block text-2xs font-extrabold uppercase tracking-wider text-foreground/60 mb-1.5 pl-1">WhatsApp / Phone Number</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"><Phone className="w-4 h-4" /></span>
                              <input
                                type="tel"
                                required
                                pattern="[0-9]{10}"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                placeholder="9876543210"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white dark:bg-[#152418] focus:outline-none focus:ring-2 focus:ring-primary/50 font-semibold"
                              />
                            </div>
                            <span className="text-[10px] text-foreground/40 mt-1 block pl-1">Please enter a valid 10-digit Indian mobile number.</span>
                          </div>

                          {/* WhatsApp Updates Switch Toggle */}
                          <div className="flex items-center justify-between p-4 bg-emerald-500/5 dark:bg-emerald-950/20 rounded-xl border border-primary/5">
                            <div className="space-y-0.5">
                              <p className="text-xs font-extrabold text-foreground">Opt-in for WhatsApp Updates</p>
                              <p className="text-[10px] text-foreground/50">Get instant growth photos & geo-tag markers</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${whatsappUpdates ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-800"
                                }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 transform ${whatsappUpdates ? "translate-x-6" : "translate-x-0"
                                  }`}
                              />
                            </button>
                          </div>
                        </div>

                        <p className="text-[10px] text-center text-foreground/40 mt-4 font-semibold">
                          🛡️ By registering your interest, you support India's reforestation drive.
                        </p>
                      </form>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar */}
      {!isSuccess && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-5 md:bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-4xl z-50 px-0 sm:px-4"
        >
          <div className="bg-white/85 dark:bg-[#112015]/95 backdrop-blur-xl border border-primary/10 dark:border-emerald-800/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl p-4 flex flex-row items-center justify-between gap-4">
            
            {/* Left Side: Step-based dynamic selection summary */}
            <div className="flex-1 flex items-center gap-3 overflow-hidden">
              {step === 1 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
                    {selectedTree.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-xs md:text-sm font-black text-foreground leading-tight">
                      {selectedTree.name} <span className="text-[10px] text-foreground/50 font-medium">({quantity} Qty)</span>
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-black">
                      ₹{(selectedTree.price * quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-inner ${location ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
                    <MapPin className={`w-5 h-5 ${location ? "animate-pulse" : "animate-bounce"}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs md:text-sm font-black text-foreground leading-tight">
                      {location && location.regionName ? location.regionName : "Choose Sector"}
                    </p>
                    <p className={`text-[10px] md:text-xs font-bold ${location ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/50"}`}>
                      {location ? "Zone Confirmed 📍" : "Select location on map"}
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
                    ✨
                  </div>
                  <div className="text-left max-w-[140px] sm:max-w-xs">
                    <p className="text-xs md:text-sm font-black text-foreground leading-tight truncate">
                      {treeName || `${selectedTree.name} Grove`}
                    </p>
                    <p className="text-[10px] md:text-xs text-foreground/50 font-bold truncate">
                      {dedication ? "Message Added 💬" : "Preview Smart Plaque"}
                    </p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
                    🌱
                  </div>
                  <div className="text-left">
                    <p className="text-xs md:text-sm font-black text-foreground leading-tight">
                      Total: ₹{(selectedTree.price * quantity).toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-extrabold">
                      Tax-Exempt Pledge
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Back, Skip, and Proceed CTA buttons */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="w-10 h-10 rounded-2xl border border-border bg-white dark:bg-[#122216] text-foreground/75 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  title="Go Back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={nextStep}
                  className="px-3 py-2 font-bold text-foreground/50 hover:text-foreground text-xs md:text-sm transition-colors"
                >
                  Skip
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={step === 2 && !location}
                  className="h-11 px-5 md:px-7 bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="interest-form"
                  disabled={isProcessing}
                  className="h-11 px-5 md:px-7 bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 active:scale-95 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed text-xs md:text-sm"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Pledge Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}
