import Link from "next/link";
import { Metadata } from "next";
import SuggestionBox from "@/components/SuggestionBox";

// Metadatos SEO para la página principal
export const metadata: Metadata = {
  title: "TheNinjaBox | Herramientas web gratis, sin publicidad y seguras",
  description: "Colección de herramientas útiles online 100% gratis, sin anuncios molestos y sin registro. Todo se procesa en tu navegador para máxima privacidad y seguridad.",
  keywords: "herramientas online gratis, sin publicidad, utilidades web seguras, procesado local, privacidad, sin registro",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-16 lg:p-24 bg-zinc-50 dark:bg-zinc-900">
      
      {/* Hero Section / USP (Unique Selling Proposition) */}
      <div className="w-full max-w-5xl text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
          Caja de Herramientas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Premium</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium mb-8">
          Totalmente gratuitas, sin anuncios invasivos y sin necesidad de crear cuenta. Todo se procesa de manera segura directamente en tu navegador web.
        </p>
        
        {/* Call to Action: Marcadores (Técnica de Retención 1) */}
        <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 text-yellow-800 dark:text-yellow-200 px-4 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all hover:bg-yellow-100 dark:hover:bg-yellow-900/40">
          <span>💡 ¿Te resulta útil? Pulsa</span>
          <kbd className="font-sans px-2 py-0.5 bg-white dark:bg-black border border-yellow-300 dark:border-yellow-600 rounded-md shadow-sm text-xs font-bold text-zinc-700 dark:text-zinc-300">Ctrl + D</kbd>
          <span className="hidden sm:inline">(o ⌘+D)</span>
          <span>para guardarnos en tus favoritos.</span>
        </div>
      </div>

      {/* Secciones de Herramientas */}
      <div className="w-full max-w-5xl flex flex-col gap-12">
        
        {/* SECCIÓN TEXTO */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <span className="text-2xl">📝</span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Herramientas de Texto</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-blue-600 transition-colors">
                Texto a PDF sin límites
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 flex-grow">
                Convierte tus archivos .txt, apuntes o bloques de texto a PDF al instante. <strong>100% privado</strong>, tu texto nunca viaja a nuestros servidores.
              </p>
            </Link>

            {/* Tarjeta para Contador de Palabras */}
            <Link 
              href="/herramientas/contador-palabras" 
              className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-emerald-600 transition-colors">
                Contador de Palabras
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 flex-grow">
                Cuenta palabras, caracteres y párrafos en tiempo real. Ideal para medir tu texto para Twitter, ensayos o tareas escolares.
              </p>
            </Link>

            {/* Buzón de sugerencias Texto */}
            <SuggestionBox category="Texto" />
          </div>
        </section>

        {/* SECCIÓN IMÁGENES */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <span className="text-2xl">🖼️</span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Herramientas de Imágenes</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-purple-600 transition-colors">
                Unir Imágenes a PDF
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 flex-grow">
                Junta tus fotos (JPG, PNG) en un único PDF en segundos. <strong>Sin marcas de agua</strong>, gratis y sin subir tus fotos personales a internet.
              </p>
            </Link>

            {/* Tarjeta para Quitar Fondo */}
            <Link 
              href="/herramientas/quitar-fondo" 
              className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-indigo-600 transition-colors">
                Quitar Fondo con IA Local
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 flex-grow">
                Elimina fondos de fotos mágicamente y sin esperas. Ejecutamos un modelo de <strong>Inteligencia Artificial directamente en tu dispositivo</strong> gratis.
              </p>
            </Link>

            {/* Buzón de sugerencias Imágenes */}
            <SuggestionBox category="Imágenes" />
          </div>
        </section>

      </div>

      {/* Manifiesto: ¿Por qué es gratis? (Técnica de Retención/SEO 2) */}
      <section className="w-full max-w-4xl mx-auto mt-24 mb-4 p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
        <span className="text-5xl mb-6 block" aria-hidden="true">✊</span>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          ¿Por qué TheNinjaBox es 100% gratis?
        </h2>
        <div className="text-zinc-600 dark:text-zinc-400 space-y-5 max-w-2xl mx-auto text-left sm:text-center text-lg leading-relaxed">
          <p>
            Estábamos hartos de entrar a páginas llenas de <strong>falsos botones de "Descargar"</strong>, 
            pop-ups intrusivos, límites de "solo 2 archivos al día" y la obligación de dejarnos el correo 
            solo para unir dos PDFs o quitar un fondo.
          </p>
          <p>
            Por eso creamos <strong className="text-zinc-900 dark:text-white">TheNinjaBox</strong>. Queríamos un rincón de internet limpio, ultrarrápido y seguro.
            Aquí no hay servidores lejanos procesando tus documentos confidenciales ni fotos privadas. 
            Todo el trabajo pesado lo hace la potencia de tu propio navegador en local.
          </p>
          <p className="font-bold text-xl text-zinc-900 dark:text-white mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            Sin trucos. Sin anuncios. Solo herramientas que funcionan.
          </p>
        </div>
      </section>

    </main>
  );
}
