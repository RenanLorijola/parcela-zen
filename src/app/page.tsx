"use client";

import InstallmentCalculator from "../components/InstallmentCalculator";
import FAQ from "../components/FAQ";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background to-muted p-6">
      <a
        href="https://github.com/RenanLorijola/parcela-zen"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-50 rounded-full bg-card p-3 shadow-lg transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
        aria-label="Ver no GitHub"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>

      <main className="flex w-full flex-col items-center gap-8 pb-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/logo.svg"
            alt="Parcela Zen Logo"
            width={80}
            height={80}
            priority
            className="drop-shadow-lg"
          />
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Parcela <span className="text-primary">Zen</span>
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Planeje suas parcelas com inteligência
            </p>
          </div>
        </div>
        
        <InstallmentCalculator />
        
        <FAQ />
      </main>
    </div>
  );
}
