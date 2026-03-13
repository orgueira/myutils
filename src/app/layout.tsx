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
  title: "OToolbox - Herramientas Online 100% Gratis y Sin Publicidad",
  description: "Descubre OToolbox: utilidades web gratuitas, sin anuncios, sin registros y procesadas de forma privada en tu navegador.",
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
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
          <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4 gap-4 sm:gap-0">
            {/* Logo y Tagline */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white transition-transform hover:scale-105">
              <span>🧰 OToolbox</span>
              <span className="hidden lg:inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] uppercase font-bold text-green-800 dark:bg-green-900/30 dark:text-green-400 tracking-wider">
                100% Gratis y Sin Ads
              </span>
            </Link>

            {/* Menú de Navegación Simple y Escalable */}
            <div className="flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Herramientas</Link>
              <Link href="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contacto / Sugerencias</Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Columna 1: Marca y Misión */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white">
                <span>🧰 OToolbox</span>
              </Link>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                Nuestra misión es crear un rincón de internet limpio. Ofrecemos herramientas premium totalmente gratis, sin anuncios invasivos, sin registros y procesando tus archivos de forma segura directamente en tu navegador.
              </p>
            </div>

            {/* Columna 2: Herramientas Destacadas */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">Herramientas Populares</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <li><Link href="/herramientas/quitar-fondo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Quitar Fondo a Imágenes</Link></li>
                <li><Link href="/herramientas/imagenes-a-pdf" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Unir Imágenes a PDF</Link></li>
                <li><Link href="/herramientas/texto-a-pdf" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Convertir Texto a PDF</Link></li>
                <li><Link href="/herramientas/formateador-json" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Formateador JSON Privado</Link></li>
              </ul>
            </div>

            {/* Columna 3: Soporte y Legal */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">Soporte y Legal</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <li><Link href="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contacto y Sugerencias</Link></li>
                <li><Link href="/privacidad" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Política de Privacidad</Link></li>
                <li><Link href="/terminos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Términos de Servicio</Link></li>
              </ul>
            </div>

          </div>
          
          <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} OToolbox. Todos los derechos reservados.</p>
            <p>Construido con ❤️ para un internet más rápido y privado.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
