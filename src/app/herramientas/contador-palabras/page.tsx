"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function ContadorPalabrasPage() {
  const [texto, setTexto] = useState("");

  // Cálculos en tiempo real
  const estadisticas = useMemo(() => {
    const textoLimpiado = texto.trim();
    
    if (!textoLimpiado) {
      return { palabras: 0, caracteresConEspacios: 0, caracteresSinEspacios: 0, parrafos: 0, frases: 0, tiempoLectura: 0 };
    }

    // Caracteres
    const caracteresConEspacios = texto.length;
    const caracteresSinEspacios = texto.replace(/\s/g, "").length;

    // Palabras (usando regex para separar por espacios o saltos de línea)
    const palabras = textoLimpiado.split(/\s+/).filter(word => word.length > 0).length;

    // Párrafos (separados por uno o más saltos de línea)
    const parrafos = textoLimpiado.split(/\n+/).filter(p => p.trim().length > 0).length;

    // Frases (separadas por . ! ? seguidos de espacio o final)
    const frases = textoLimpiado.split(/[.!?]+(?=\s|$)/).filter(f => f.trim().length > 0).length;

    // Tiempo de lectura estimado (promedio de 250 palabras por minuto)
    const tiempoLectura = Math.ceil(palabras / 250);

    return { palabras, caracteresConEspacios, caracteresSinEspacios, parrafos, frases, tiempoLectura };
  }, [texto]);

  const borrarTexto = () => setTexto("");

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-900">
      
      {/* Botón Volver */}
      <div className="w-full max-w-5xl mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a Herramientas
        </Link>
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center">

        {/* Encabezado SEO */}
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Contador de Palabras y Caracteres
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-2xl">
          Escribe o pega tu texto y obtén métricas detalladas al instante. Herramienta 100% gratuita, privada en tu navegador y sin anuncios.
        </p>

        {/* Casos de Uso Frecuentes (SEO Long-Tail) */}
        <div className="w-full max-w-4xl mt-1 mb-8 bg-zinc-100/50 dark:bg-zinc-800/30 rounded-xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <span>💡</span> Casos de uso más populares:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Contar caracteres para saber si un texto entra en el límite de un <strong>tweet en X (Twitter)</strong> o descripción de Instagram.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Revisar si un <strong>artículo, ensayo o trabajo escolar</strong> cumple con el número mínimo de palabras exigido.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Medir la longitud de <strong>etiquetas SEO Title o Meta Description</strong> en tu web para no pasarte de caracteres.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Todo es privado: pega tus <strong>contratos o documentos de trabajo</strong> sin miedo a que se suban a un servidor.
            </li>
          </ul>
        </div>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full max-w-5xl bg-white dark:bg-zinc-950 p-4 sm:p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-12">
          
          {/* Panel de Estadísticas Rápidas */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50 text-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 leading-none mb-1">{estadisticas.palabras}</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">Palabras</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-center">
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 leading-none mb-1">{estadisticas.caracteresConEspacios}</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Caract.</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-center">
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 leading-none mb-1">{estadisticas.caracteresSinEspacios}</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis w-full" title="Sin espacios">Sin Espacios</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-center">
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 leading-none mb-1">{estadisticas.frases}</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Frases</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-center">
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 leading-none mb-1">{estadisticas.parrafos}</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Párrafos</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-center">
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 leading-none mb-1">{estadisticas.tiempoLectura}<span className="text-xs font-semibold text-zinc-500 ml-0.5">m</span></span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis w-full" title="Tiempo lectura">Lectura</span>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={2000000} // Límite generoso de ~2MB para evitar cuelgues del navegador
              className="w-full min-h-[300px] sm:min-h-[400px] p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 outline-none resize-y text-sm sm:text-base leading-relaxed shadow-inner"
              placeholder="Escribe o pega aquí tu texto para comenzar a contar..."
            />
            {texto && (
              <button 
                onClick={borrarTexto}
                className="absolute top-3 right-3 p-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-md transition-colors shadow-sm font-medium text-xs flex items-center gap-1"
                title="Borrar todo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* --- CONTENIDO SEO --- */}
        <article className="w-full max-w-4xl text-zinc-800 dark:text-zinc-300 space-y-8 text-sm sm:text-base mb-12">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">¿Por qué usar nuestro Contador de Palabras?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Totalmente Privado</h3>
                <p className="text-sm">Todo el cálculo, conteo y análisis se realiza en tu propio navegador. Ninguna parte de tu texto es subida a nuestros servidores. Puedes usar esta herramienta para medir contratos o documentos empresariales con total seguridad.</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Resultados en Tiempo Real</h3>
                <p className="text-sm">Sin tener que hacer clic en ningún botón. A medida que escribes o copias tu texto, las tarjetas de estadísticas actualizan el número de palabras, frases y tiempo de lectura al instante.</p>
              </div>
            </div>
          </section>

          {/* --- SECCIÓN DE COMPARTIR --- */}
          <section className="pb-16 mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-12">
            <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">¿Te ha sido útil esta herramienta?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">Ayúdanos a llegar a más personas compartiéndola con tus amigos o compañeros.</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://api.whatsapp.com/send?text=Mira%20este%20contador%20de%20palabras%20gratuito%20y%20seguro%3A%20https%3A%2F%2Fotoolbox.com%2Fherramientas%2Fcontador-palabras" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-xl transition-colors shadow-sm"
              >
                Compartir por WhatsApp
              </a>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}