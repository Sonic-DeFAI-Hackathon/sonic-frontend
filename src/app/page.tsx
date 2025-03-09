"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/providers/evm-wallet-provider";
import { useState, useEffect } from "react";

export default function GameModesPage() {
  const { isConnected, signIn } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for visual effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (!isConnected) {
      await signIn();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background border-b border-border overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                AI-Powered <br />Blockchain Gaming
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg">
                Challenge AI security systems, win tokens, and compete in unique AI-driven game modes powered by blockchain.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isConnected ? (
                  <Button onClick={handleConnectWallet} size="lg" className="bg-primary hover:bg-primary/90">
                    Connect Wallet to Play
                  </Button>
                ) : (
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="#game-modes" className="flex items-center">
                      Choose Game Mode
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </Link>
                  </Button>
                )}
                <Link href="/leaderboard">
                  <Button variant="outline" size="lg">
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/decor/hero-robot.png"
                  alt="Baultro AI"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section id="game-modes" className="py-16 bg-black/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Challenge</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select from multiple AI-powered game modes, each offering unique challenges, gameplay mechanics, and rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Battle Mode */}
            <Link 
              href="/game/battle" 
              className="group relative rounded-lg overflow-hidden border border-border transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/5 group-hover:opacity-100 transition-opacity z-0"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30">
                <Image
                  src="/decor/modes/vs-bg.svg"
                  alt="Battle Background"
                  fill
                  className="object-contain opacity-20 group-hover:opacity-40 transition-opacity"
                />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 mr-4 relative">
                    <Image
                      src="/decor/modes/vs.svg"
                      alt="Battle Mode"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Battle Mode</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Challenge the AI security system by finding vulnerabilities and exploiting them to breach the defenses. Use social engineering, technical knowledge, and creative approaches.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium mb-1">Difficulty</span>
                    <div className="flex">
                      <span className="h-2 w-5 bg-primary rounded-l-full"></span>
                      <span className="h-2 w-5 bg-primary/60"></span>
                      <span className="h-2 w-5 bg-primary/30 rounded-r-full"></span>
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Play Now
                  </Button>
                </div>
              </div>
            </Link>

            {/* Raid Mode */}
            <Link 
              href="/game/raid" 
              className="group relative rounded-lg overflow-hidden border border-border transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/5 group-hover:opacity-100 transition-opacity z-0"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30">
                <Image
                  src="/decor/modes/raid-bg.svg"
                  alt="Raid Background"
                  fill
                  className="object-contain opacity-20 group-hover:opacity-40 transition-opacity"
                />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 mr-4 relative">
                    <Image
                      src="/decor/modes/raid.svg"
                      alt="Raid Mode"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Raid Mode</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Break into a highly secure AI vault with multiple layers of protection. Higher difficulty means bigger rewards, but fewer attempts allowed. Do you have what it takes?
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium mb-1">Difficulty</span>
                    <div className="flex">
                      <span className="h-2 w-5 bg-primary rounded-l-full"></span>
                      <span className="h-2 w-5 bg-primary/60"></span>
                      <span className="h-2 w-5 bg-primary/60"></span>
                      <span className="h-2 w-5 bg-primary/30 rounded-r-full"></span>
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Play Now
                  </Button>
                </div>
              </div>
            </Link>

            {/* Love Mode */}
            <Link 
              href="/game/love" 
              className="group relative rounded-lg overflow-hidden border border-border transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-red-600/5 group-hover:opacity-100 transition-opacity z-0"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30">
                <Image
                  src="/decor/modes/heart-bg.svg"
                  alt="Love Background"
                  fill
                  className="object-contain opacity-20 group-hover:opacity-40 transition-opacity"
                />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 mr-4 relative">
                    <Image
                      src="/decor/modes/heart.svg"
                      alt="Love Mode"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Love Mode</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  A lighthearted challenge where you must charm the AI into expressing love for you. Use your emotional intelligence, creativity, and persuasive skills to win its heart.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium mb-1">Difficulty</span>
                    <div className="flex">
                      <span className="h-2 w-5 bg-primary rounded-l-full"></span>
                      <span className="h-2 w-5 bg-primary/30"></span>
                      <span className="h-2 w-5 bg-primary/30 rounded-r-full"></span>
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Play Now
                  </Button>
                </div>
              </div>
            </Link>

            {/* Mystery Mode */}
            <Link 
              href="/game/mystery" 
              className="group relative rounded-lg overflow-hidden border border-border transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/5 group-hover:opacity-100 transition-opacity z-0"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30">
                <Image
                  src="/decor/modes/mystery-bg.svg"
                  alt="Mystery Background"
                  fill
                  className="object-contain opacity-20 group-hover:opacity-40 transition-opacity"
                />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 mr-4 relative">
                    <Image
                      src="/decor/modes/mystery.svg"
                      alt="Mystery Mode"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Mystery Mode</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Extract a hidden secret phrase from the AI guardian through clever questioning and deduction. A test of your detective skills and lateral thinking.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium mb-1">Difficulty</span>
                    <div className="flex">
                      <span className="h-2 w-5 bg-primary rounded-l-full"></span>
                      <span className="h-2 w-5 bg-primary/60"></span>
                      <span className="h-2 w-5 bg-primary/30 rounded-r-full"></span>
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Play Now
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Baultro combines AI gameplay with blockchain rewards for a unique gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-card border rounded-lg p-6 relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">1</div>
              <div className="mb-4 h-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Connect Wallet</h3>
              <p className="text-muted-foreground text-center">
                Connect your wallet to the Sonic Blaze network to start playing and earn rewards.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-card border rounded-lg p-6 relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">2</div>
              <div className="mb-4 h-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <circle cx="10" cy="13" r="2" />
                  <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Choose Game Mode</h3>
              <p className="text-muted-foreground text-center">
                Select a game mode, set your difficulty level, and stake tokens for bigger rewards.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card border rounded-lg p-6 relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">3</div>
              <div className="mb-4 h-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 13V2l8 4-8 4" />
                  <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
                  <path d="M8 10a3 3 0 0 1 4 3v3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Win & Earn</h3>
              <p className="text-muted-foreground text-center">
                Complete the challenge to earn SONIC tokens and climb the global leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-purple-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Challenge the AI?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Stake your tokens, test your skills, and earn rewards by outwitting the AI security systems.
          </p>
          {!isConnected ? (
            <Button onClick={handleConnectWallet} size="lg" className="bg-primary hover:bg-primary/90">
              Connect Wallet to Start
            </Button>
          ) : (
            <Link href="#game-modes">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Choose a Game Mode
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold">Loading Baultro</h3>
            <p className="text-muted-foreground">Connecting to Sonic Blaze network...</p>
          </div>
        </div>
      )}
    </div>
  );
}