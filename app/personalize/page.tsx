"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CheckCircle2, ChevronRight, MapPin, TreePine, CreditCard } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";

// Dynamic import for Leaflet map to avoid SSR issues
const MapSelection = dynamic(() => import("@/components/ui/MapSelection"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-accent/20 animate-pulse rounded-xl flex items-center justify-center">Loading map...</div>
});

const TREE_TYPES = [
  { id: "banyan", name: "Banyan Tree", co2: "50 lbs/yr", price: 999, icon: <TreePine className="w-8 h-8" /> },
  { id: "peepal", name: "Peepal Tree", co2: "45 lbs/yr", price: 499, icon: <TreePine className="w-8 h-8" /> },
  { id: "neem", name: "Neem Tree", co2: "40 lbs/yr", price: 299, icon: <TreePine className="w-8 h-8" /> },
];

export default function PersonalizeTree() {
  const [step, setStep] = useState(1);
  const [selectedTree, setSelectedTree] = useState(TREE_TYPES[0]);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [dedication, setDedication] = useState("");
  const [treeName, setTreeName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedTree.price }),
      });
      const order = await response.json();

      if (order.error) {
        alert("Failed to create order. Please try again.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "Urban Forest",
        description: `Planting a ${selectedTree.name}`,
        order_id: order.id,
        handler: function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          router.push("/dashboard");
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#40916c",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border/50 -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 -z-10"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= num ? "bg-primary text-primary-foreground" : "bg-white dark:bg-[#152418] text-foreground/40 border-2 border-border/50"
                }`}
              >
                {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-sm font-medium text-foreground/60">
            <span>Choose Tree</span>
            <span>Location</span>
            <span>Dedication</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#152418] rounded-3xl p-8 md:p-12 shadow-xl border border-border/50">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Select Your Tree</h2>
                  <p className="text-foreground/60">Different trees have different impacts. Choose the one that resonates with you.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TREE_TYPES.map(tree => (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedTree.id === tree.id 
                        ? "border-primary bg-primary/5 shadow-md scale-105" 
                        : "border-border/50 hover:border-primary/50 hover:bg-accent/10"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        selectedTree.id === tree.id ? "bg-primary text-white" : "bg-accent/50 text-primary"
                      }`}>
                        {tree.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{tree.name}</h3>
                      <p className="text-sm text-foreground/60 mb-4">Offsets {tree.co2}</p>
                      <p className="font-bold text-lg">₹{tree.price}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Choose Location</h2>
                  <p className="text-foreground/60">Where would you like to plant your tree? Select a spot on the map.</p>
                </div>
                
                <MapSelection onLocationSelect={(lat, lng) => setLocation({lat, lng})} />
                
                {location && (
                  <div className="p-4 bg-accent/20 rounded-xl flex items-center gap-3 text-primary font-medium">
                    <MapPin className="w-5 h-5" />
                    Coordinates selected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Personalize It</h2>
                  <p className="text-foreground/60">Give your tree a name and add a dedication message.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Tree Name (Optional)</label>
                    <input 
                      type="text" 
                      value={treeName}
                      onChange={(e) => setTreeName(e.target.value)}
                      placeholder="e.g. The Guardian"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-[#152418] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Dedication Message</label>
                    <textarea 
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      placeholder="e.g. Dedicated to my mother, who always loved the forest."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-[#152418] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-accent/10 rounded-2xl border border-accent/30">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <TreePine className="w-5 h-5" /> Preview
                  </h4>
                  <p className="text-lg font-bold">
                    {treeName || selectedTree.name}
                  </p>
                  {dedication && (
                    <p className="text-foreground/70 italic mt-2 border-l-2 border-primary/30 pl-3">
                      &quot;{dedication}&quot;
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <CreditCard className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Complete Planting</h2>
                  <p className="text-foreground/60">Review your order and proceed to payment.</p>
                </div>
                
                <div className="max-w-sm mx-auto bg-white dark:bg-[#152418] p-6 rounded-2xl border border-border/50 text-left space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="font-medium text-foreground/70">Tree Type</span>
                    <span className="font-bold">{selectedTree.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="font-medium text-foreground/70">Planting & Care</span>
                    <span className="font-bold">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">₹{selectedTree.price}</span>
                  </div>
                </div>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="inline-flex items-center justify-center w-full max-w-sm px-8 py-4 bg-primary text-white rounded-full text-lg font-bold shadow-lg hover:bg-primary/90 transition-all gap-2 disabled:opacity-70"
                >
                  {isProcessing ? "Processing..." : "Confirm & Pay"} <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-foreground/40 mt-4">Secure payment via Razorpay.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between pt-6 border-t border-border/50">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="px-6 py-2 rounded-full font-medium text-foreground/70 hover:bg-accent/20 transition-colors"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 4 && (
              <div className="flex gap-4">
                {(step === 2 || step === 3) && (
                  <button 
                    onClick={nextStep}
                    className="px-6 py-2 font-medium text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Skip
                  </button>
                )}
                <button 
                  onClick={nextStep}
                  disabled={step === 2 && !location}
                  className="px-8 py-2 bg-primary text-white rounded-full font-bold shadow-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </div>
  );
}
