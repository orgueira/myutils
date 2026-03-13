import Link from "next/link";
import { Metadata } from "next";
import SuggestionBox from "@/components/SuggestionBox";

// Metadatos SEO para la página principal
export const metadata: Metadata = {
  title: "OToolbox | Herramientas web gratis, sin publicidad y seguras",
  description: "Colección de herramientas útiles online 100% gratis, sin anuncios molestos y sin registro. Todo se procesa en tu navegador para máxima privacidad y seguridad.",
  keywords: "herramientas online gratis, sin publicidad, utilidades web seguras, procesado local, privacidad, sin registro",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 lg:p-12 bg-zinc-50 dark:bg-zinc-900">
      
      {/* Hero Section / USP (Unique Selling Proposition) */}
      <div className="w-full max-w-6xl text-center mb-10">
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium mb-6">
          Totalmente gratuitas, sin anuncios invasivos y sin necesidad de crear cuenta. Todo se procesa de manera segura directamente en tu navegador web.
        </p>
        
        {/* Call to Action: Marcadores (Técnica de Retención 1) */}
        <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 text-yellow-800 dark:text-yellow-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all hover:bg-yellow-100 dark:hover:bg-yellow-900/40">
          <span>💡 ¿Te resulta útil? Pulsa</span>
          <kbd className="font-sans px-2 py-0.5 bg-white dark:bg-black border border-yellow-300 dark:border-yellow-600 rounded-md shadow-sm text-xs font-bold text-zinc-700 dark:text-zinc-300">Ctrl + D</kbd>
          <span className="hidden sm:inline">(o ⌘+D)</span>
          <span>para guardarnos en tus favoritos.</span>
        </div>
      </div>

      {/* Secciones de Herramientas */}
      <div className="w-full max-w-6xl flex flex-col gap-10">
        
        {/* SECCIÓN TEXTO */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <span className="text-xl">📝</span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Herramientas de Texto</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tarjeta (Card) para el Conversor Texto a PDF */}
            <Link 
              href="/herramientas/texto-a-pdf" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 transition-colors leading-tight">
                  Texto a PDF sin límites
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Convierte tus archivos .txt, apuntes o bloques de texto a PDF al instante. <strong>100% privado</strong>, tu texto nunca viaja a nuestros servidores.
              </p>
            </Link>

            {/* Tarjeta para Contador de Palabras */}
            <Link 
              href="/herramientas/contador-palabras" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 transition-colors leading-tight">
                  Contador de Palabras
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Cuenta palabras, caracteres y párrafos en tiempo real. Ideal para medir tu texto para Twitter, ensayos o tareas escolares.
              </p>
            </Link>

            {/* Buzón de sugerencias Texto */}
            <div className="flex h-full w-full">
              <SuggestionBox category="Texto" />
            </div>
          </div>
        </section>

        {/* SECCIÓN IMÁGENES */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <span className="text-xl">🖼️</span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Herramientas de Imágenes</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tarjeta (Card) para el Conversor Imágenes a PDF */}
            <Link 
              href="/herramientas/imagenes-a-pdf" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-purple-600 transition-colors leading-tight">
                  Unir Imágenes a PDF
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Junta tus fotos (JPG, PNG) en un único PDF en segundos. <strong>Sin marcas de agua</strong>, gratis y sin subir tus fotos personales a internet.
              </p>
            </Link>

            {/* Tarjeta para Quitar Fondo */}
            <Link 
              href="/herramientas/quitar-fondo" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 transition-colors leading-tight">
                  Quitar Fondo con IA Local
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Elimina fondos de fotos mágicamente y sin esperas. Ejecutamos un modelo de <strong>Inteligencia Artificial directamente en tu dispositivo</strong> gratis.
              </p>
            </Link>

            {/* Tarjeta para Redimensionar Imágenes */}
            <Link 
              href="/herramientas/redimensionador-imagenes" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-pink-500 hover:shadow-md hover:shadow-pink-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-pink-600 transition-colors leading-tight">
                  Redimensionador
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Cambia el tamaño y ajusta tus fotos manteniendo la calidad y proporción. 100% privado desde tu navegador.
              </p>
            </Link>

            {/* Buzón de sugerencias Imágenes */}
            <div className="flex h-full w-full">
              <SuggestionBox category="Imágenes" />
            </div>
          </div>
        </section>

        {/* SECCIÓN TECHIE / DESARROLLADORES */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <span className="text-xl">🧑‍💻</span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Herramientas Techie</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tarjeta para Formateador JSON */}
            <Link 
              href="/herramientas/formateador-json" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-orange-500 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-orange-600 transition-colors leading-tight">
                  Formateador JSON
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Formatea, valida y embellece código JSON. Analiza datos estructurados con total privacidad y sin salir de tu navegador.
              </p>
            </Link>

            {/* Tarjeta para Generador de Contraseñas */}
            <Link 
              href="/herramientas/generador-contrasenas" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-red-500 hover:shadow-md hover:shadow-red-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-red-600 transition-colors leading-tight">
                  Generador de Contraseñas
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Crea contraseñas hiper-seguras y aleatorias en tu propio dispositivo. Completamente privadas y sin conexión a internet.
              </p>
            </Link>

            {/* Tarjeta para Generador UUID */}
            <Link 
              href="/herramientas/generador-uuid" 
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-cyan-500 hover:shadow-md hover:shadow-cyan-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-cyan-600 transition-colors leading-tight">
                  Generador UUID / GUID
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow leading-relaxed">
                Genera múltiples identificadores únicos universales (v4) en milisegundos para tus bases de datos o proyectos de desarrollo.
              </p>
            </Link>

            {/* Buzón de sugerencias Techie */}
            <div className="flex h-full w-full">
              <SuggestionBox category="Techie" />
            </div>
          </div>
        </section>

      </div>

      {/* Manifiesto: ¿Por qué es gratis? (Técnica de Retención/SEO 2) */}
      <section className="w-full max-w-4xl mx-auto mt-16 mb-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
        <span className="text-3xl mb-4 block" aria-hidden="true">✊</span>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          ¿Por qué OToolbox es 100% gratis?
        </h2>
        <div className="text-zinc-600 dark:text-zinc-400 space-y-4 max-w-2xl mx-auto text-left sm:text-center text-sm sm:text-base leading-relaxed">
          <p>
            Estábamos hartos de entrar a páginas llenas de <strong>falsos botones de "Descargar"</strong>, 
            pop-ups intrusivos, límites de "solo 2 archivos al día" y la obligación de dejarnos el correo 
            solo para unir dos PDFs o quitar un fondo.
          </p>
          <p>
            Por eso creamos <strong className="text-zinc-900 dark:text-white">OToolbox</strong>. Queríamos un rincón de internet limpio, ultrarrápido y seguro.
            Aquí no hay servidores lejanos procesando tus documentos confidenciales ni fotos privadas. 
            Todo el trabajo pesado lo hace la potencia de tu propio navegador en local.
          </p>
          <p className="font-bold text-base text-zinc-900 dark:text-white mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            Sin trucos. Sin anuncios. Solo herramientas que funcionan.
          </p>
        </div>
      </section>

    </main>
  );
}
