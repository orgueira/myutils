"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GeneradorUUID() {
  const [uuidPrincipal, setUuidPrincipal] = useState("");
  const [cantidadMultiples, setCantidadMultiples] = useState(5);
  const [uuidsMultiples, setUuidsMultiples] = useState<string[]>([]);
  const [copiadoPrincipal, setCopiadoPrincipal] = useState(false);
  const [copiadosTodos, setCopiadosTodos] = useState(false);
  const [mayusculas, setMayusculas] = useState(false);

  // Función para generar un UUID v4 seguro
  const generarUUIDv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
    );
  };

  const formatearUUID = (uuid: string) => {
    return mayusculas ? uuid.toUpperCase() : uuid;
  };

  const generarUnico = () => {
    setUuidPrincipal(formatearUUID(generarUUIDv4()));
    setCopiadoPrincipal(false);
  };

  const generarVarios = () => {
    const nuevos = [];
    for (let i = 0; i < Math.min(cantidadMultiples, 1000); i++) {
      nuevos.push(formatearUUID(generarUUIDv4()));
    }
    setUuidsMultiples(nuevos);
    setCopiadosTodos(false);
  };

  useEffect(() => {
    generarUnico();
    generarVarios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mayusculas]); // Si cambia el formato, regenerar

  const copiarPrincipal = () => {
    navigator.clipboard.writeText(uuidPrincipal);
    setCopiadoPrincipal(true);
    setTimeout(() => setCopiadoPrincipal(false), 2000);
  };

  const copiarTodos = () => {
    navigator.clipboard.writeText(uuidsMultiples.join('\n'));
    setCopiadosTodos(true);
    setTimeout(() => setCopiadosTodos(false), 2000);
  };

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

      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Encabezado */}
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Generador de UUID (v4)
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6 text-center">
          Genera identificadores únicos universales para tus bases de datos o aplicaciones.
        </p>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full bg-white dark:bg-zinc-950 p-5 sm:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-12">
          
          <div className="flex justify-end mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <input 
                type="checkbox" 
                checked={mayusculas} 
                onChange={(e) => setMayusculas(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-cyan-600 focus:ring-cyan-600"
              />
              Formato en MAYÚSCULAS
            </label>
          </div>

          {/* UUID Principal */}
          <div className="mb-8 p-6 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-3">Tu UUID (Versión 4)</p>
            <div className="text-xl sm:text-3xl font-mono font-semibold text-zinc-900 dark:text-white mb-6 break-all">
              {uuidPrincipal}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button 
                onClick={generarUnico}
                className="px-6 py-2.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Regenerar
              </button>
              <button 
                onClick={copiarPrincipal}
                className={`px-6 py-2.5 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2 ${copiadoPrincipal ? 'bg-emerald-500' : 'bg-cyan-600 hover:bg-cyan-700'}`}
              >
                {copiadoPrincipal ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                    Copiar UUID
                  </>
                )}
              </button>
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

          {/* Generador por lotes (Bulk) */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h3 className="font-bold text-zinc-800 dark:text-zinc-200">Generar múltiples UUIDs</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="1" 
                  max="1000" 
                  value={cantidadMultiples} 
                  onChange={(e) => setCantidadMultiples(Number(e.target.value))}
                  className="w-20 px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded text-center outline-none focus:border-cyan-500"
                />
                <button 
                  onClick={generarVarios}
                  className="px-4 py-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-medium rounded transition-colors"
                >
                  Generar
                </button>
                <button 
                  onClick={copiarTodos}
                  className={`px-4 py-1.5 text-white text-sm font-medium rounded transition-colors ${copiadosTodos ? 'bg-emerald-500' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                >
                  {copiadosTodos ? 'Copiados' : 'Copiar Lista'}
                </button>
              </div>
            </div>
            
            <textarea 
              readOnly
              value={uuidsMultiples.join('\n')}
              className="w-full h-48 p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none resize-y"
            />
          </div>

        </div>
        
        {/* --- CONTENIDO SEO --- */}
        <article className="w-full text-zinc-800 dark:text-zinc-300 space-y-8 text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">¿Qué es un UUID o GUID?</h2>
            <p className="mb-3">Un <strong>Identificador Único Universal (UUID)</strong>, también conocido como Identificador Único Global (GUID) en el ecosistema de Microsoft, es un número de 128 bits utilizado para identificar información en sistemas informáticos de forma única en todo el mundo.</p>
            <p className="mb-3">Nuestra herramienta genera la <strong>Versión 4 (v4)</strong>, que se basa en números aleatorios o pseudoaleatorios. Al tener 122 bits aleatorios, la posibilidad de colisión (generar el mismo número dos veces) es prácticamente cero, lo que lo hace perfecto para claves primarias en bases de datos o nombres de archivos de subida.</p>
          </section>
        </article>

      </div>
    </main>
  );
}