import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheNinjaBox - Herramientas Online 100% Gratis y Sin Publicidad",
  description: "Descubre TheNinjaBox: utilidades web gratuitas, sin anuncios, sin registros y procesadas de forma privada en tu navegador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4 gap-4 sm:gap-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white transition-transform hover:scale-105">
              <span>🥷 TheNinjaBox</span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                100% Gratis y Sin Ads
              </span>
            </Link>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium items-center">
              {/* Bloque Texto */}
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900/50 pl-3 pr-1 py-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 font-semibold tracking-wide uppercase text-xs">📝 Texto</span>
                <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                <Link href="/herramientas/texto-a-pdf" className="px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Texto a PDF</Link>
                <Link href="/herramientas/contador-palabras" className="px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Contar Palabras</Link>
              </div>
              
              {/* Bloque Imágenes */}
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900/50 pl-3 pr-1 py-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 font-semibold tracking-wide uppercase text-xs">🖼️ Imágenes</span>
                <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                <Link href="/herramientas/imagenes-a-pdf" className="px-3 py-1.5 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">Imágenes a PDF</Link>
                <Link href="/herramientas/quitar-fondo" className="px-3 py-1.5 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">Quitar Fondo</Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-zinc-500 dark:text-zinc-400 text-sm bg-white dark:bg-zinc-950">
          <p>© {new Date().getFullYear()} TheNinjaBox. Herramientas 100% gratuitas, sin publicidad y seguras en tu navegador.</p>
        </footer>
      </body>
    </html>
  );
}
