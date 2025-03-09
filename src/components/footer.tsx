"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-12 py-8 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logos/baultro.svg"
                alt="Baultro Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">Baultro</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered blockchain gaming on NEAR Protocol combining gameplay with prediction markets
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/baultro" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://discord.gg/baultro" aria-label="Discord">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </a>
              <a href="https://github.com/baultro" aria-label="GitHub">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Game Modes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/game/battle" className="text-muted-foreground hover:text-foreground">
                  Battle Mode
                </Link>
              </li>
              <li>
                <Link href="/game/love" className="text-muted-foreground hover:text-foreground">
                  Love Mode
                </Link>
              </li>
              <li>
                <Link href="/game/mystery" className="text-muted-foreground hover:text-foreground">
                  Mystery Mode
                </Link>
              </li>
              <li>
                <Link href="/game/raid" className="text-muted-foreground hover:text-foreground">
                  Raid Mode
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Baultro. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground mr-2">
              Powered by
            </span>
            <Image
              src="/logos/near-protocol-near-logo.svg"
              alt="NEAR Protocol"
              width={80}
              height={20}
              className="h-5 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
