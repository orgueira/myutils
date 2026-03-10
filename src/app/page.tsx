import Link from "next/link";
import { Metadata } from "next";

// Metadatos SEO para la página principal
export const metadata: Metadata = {
  title: "MyUtils | Herramientas web gratis y seguras online",
  description: "Colección de herramientas útiles y utilidades gratis directamente en tu navegador. Sin registro ni instalaciones. Rápido, seguro y orientado a la productividad.",
  keywords: "herramientas online, utilidades web, gratis, productividad online",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-900">
      
      {/* Cabecera (Hero Section) */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center mt-12 mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          MyUtils <span className="text-blue-600">Herramientas Web</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Tu navaja suiza de utilidades diarias. Herramientas rápidas, gratuitas y totalmente seguras (se ejecutan en tu propio navegador) para aumentar tu productividad.
        </p>
      </div>

      {/* Grid o Directorio de Herramientas */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Tarjeta (Card) para el Conversor Texto a PDF */}
        <Link 
          href="/herramientas/texto-a-pdf" 
          className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-blue-600 transition-colors">
            Conversor Texto a PDF
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 flex-grow">
            Transforma rápidamente cualquier bloque de texto, archivos .txt o apuntes en un documento PDF bien formateado.
          </p>
        </Link>

        {/* Tarjeta (Card) para el Conversor Imágenes a PDF */}
        <Link 
          href="/herramientas/imagenes-a-pdf" 
          className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-purple-600 transition-colors">
            Conversor Imágenes a PDF
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 flex-grow">
            Selecciona varias fotos, capturas o imágenes (JPG, PNG) y únelas en un único archivo PDF al instante de forma privada.
          </p>
        </Link>

        {/* Espacio para futuras herramientas (placeholder visual) */}
        <div className="flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed bg-zinc-50/50 dark:bg-zinc-900/50 justify-center items-center text-center opacity-70">
           <h3 className="text-lg font-medium text-zinc-500 dark:text-zinc-500 mb-1">
             Próximamente...
           </h3>
           <p className="text-sm text-zinc-400 dark:text-zinc-600">
             Más utilidades increíbles están en camino.
           </p>
        </div>

      </div>

    </main>
  );
}