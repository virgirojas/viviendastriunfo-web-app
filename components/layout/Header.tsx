"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <Image
            src="/logo_final.png"
            alt="Viviendas Triunfo Logo"
            width={180}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
          >
            Inicio
          </Link>
          <Link
            href="/tipologias"
            className="text-sm font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
          >
            Tipologías
          </Link>
          <Link
            href="/#destacados"
            className="text-sm font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
          >
            Destacados
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contacto" className="hidden sm:inline-flex items-center justify-center rounded bg-brand-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-white hover:text-black">
            Consultar
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center text-white transition hover:text-brand-primary"
            aria-label="Alternar menú"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black absolute w-full shadow-2xl">
          <nav className="flex flex-col px-4 py-6 space-y-6">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-base font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
            >
              Inicio
            </Link>
            <Link 
              href="/tipologias" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-base font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
            >
              Tipologías
            </Link>
            <Link 
              href="/#destacados" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-base font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
            >
              Destacados
            </Link>
            <Link 
              href="/contacto" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-base font-bold uppercase tracking-wider text-white transition hover:text-brand-primary"
            >
              Contacto
            </Link>
            
            <div className="pt-6 border-t border-white/10">
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center rounded bg-brand-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black">
                Consultar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
