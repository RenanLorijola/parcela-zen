"use client";

import InstallmentCalculator from "../components/InstallmentCalculator";
import FAQ from "../components/FAQ";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background to-muted p-6">
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
