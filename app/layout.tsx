import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Home as HomeIcon, TreePine, BookOpen } from "lucide-react";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urban Forest | Reforesting India, One Tree At A Time",
  description: "Geo-tag real saplings in Indian micro-forests, monitor chlorophyll gains, and trigger smart updates—designed for the next generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon/tree-pine.svg" type="image/svg+xml" />
      </Head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          
          {/* Padding bottom added to mobile to prevent fixed bottom-nav overlap */}
          <main className="flex-1 flex flex-col pb-24 md:pb-0">{children}</main>
          
          <Footer />

          {/* Premium Floating Mobile Bottom Nav - mimic real native mobile app */}
          <div className="md:hidden fixed bottom-5 left-4 right-4 z-50">
            <div className="bg-white/80 dark:bg-[#112015]/85 backdrop-blur-2xl rounded-2xl h-16 border border-emerald-500/10 dark:border-emerald-500/5 shadow-2xl flex items-center justify-between px-6 relative max-w-md mx-auto">
              
              {/* Tab: Home */}
              <Link href="/" className="flex flex-col items-center justify-center space-y-1 text-foreground/60 hover:text-primary transition-colors flex-1 py-1">
                <HomeIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-wide">Home</span>
              </Link>

              {/* Floating Central Tab: Plant */}
              <div className="relative -top-5 flex-1 flex justify-center">
                <Link 
                  href="/personalize" 
                  className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25 border-4 border-white dark:border-[#112015] hover:scale-110 active:scale-95 transition-all"
                >
                  <TreePine className="w-6 h-6 animate-pulse" />
                </Link>
              </div>

              {/* Tab: Story */}
              <Link href="/story" className="flex flex-col items-center justify-center space-y-1 text-foreground/60 hover:text-primary transition-colors flex-1 py-1">
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-wide">Our Story</span>
              </Link>

            </div>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}
