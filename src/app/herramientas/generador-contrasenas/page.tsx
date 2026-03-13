"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function GeneradorContrasenas() {
  const [contrasena, setContrasena] = useState("");
  const [longitud, setLongitud] = useState(16);
  const [opciones, setOpciones] = useState({
    mayusculas: true,
    minusculas: true,
    numeros: true,
    simbolos: true,
  });
  const [copiado, setCopiado] = useState(false);

  // Calcula la fortaleza visual de la contraseña
  const [fortaleza, setFortaleza] = useState(0);

  const generarContrasena = useCallback(() => {
    let charset = "";
    if (opciones.mayusculas) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (opciones.minusculas) charset += "abcdefghijklmnopqrstuvwxyz";
    if (opciones.numeros) charset += "0123456789";
    if (opciones.simbolos) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Si el usuario quita todas las opciones (fallback)
    if (charset === "") {
      charset = "abcdefghijklmnopqrstuvwxyz";
      setOpciones(prev => ({ ...prev, minusculas: true }));
    }

    let nuevaContrasena = "";
    const valoresAleatorios = new Uint32Array(longitud);
    window.crypto.getRandomValues(valoresAleatorios);

    for (let i = 0; i < longitud; i++) {
      nuevaContrasena += charset[valoresAleatorios[i] % charset.length];
    }
    setContrasena(nuevaContrasena);
    setCopiado(false);

    // Evaluar fortaleza
    let score = 0;
    if (longitud > 8) score += 1;
    if (longitud > 12) score += 1;
    if (longitud >= 16) score += 1;
    if (opciones.mayusculas && opciones.minusculas) score += 1;
    if (opciones.numeros) score += 1;
    if (opciones.simbolos) score += 1;
    setFortaleza(Math.min(5, score));
  }, [longitud, opciones]);

  useEffect(() => {
    generarContrasena();
  }, [generarContrasena]);

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(contrasena);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const getFortalezaColor = () => {
    if (fortaleza <= 2) return "bg-red-500";
    if (fortaleza === 3) return "bg-yellow-500";
    if (fortaleza >= 4) return "bg-emerald-500";
    return "bg-zinc-300 dark:bg-zinc-700";
  };

  const getFortalezaText = () => {
    if (fortaleza <= 2) return "Débil";
    if (fortaleza === 3) return "Buena";
    if (fortaleza >= 4) return "Fuerte";
    return "";
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

      <div className="w-full max-w-3xl flex flex-col items-center">
        
        {/* Encabezado */}
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Generador de Contraseñas
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6 text-center">
          Genera contraseñas fuertes y seguras al instante usando encriptación local. Todo ocurre en tu dispositivo.
        </p>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full bg-white dark:bg-zinc-950 p-5 sm:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-12">
          
          {/* Pantalla de Contraseña */}
          <div className="relative w-full mb-6">
            <div className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 break-all">
              <span className="text-2xl sm:text-3xl font-mono text-zinc-900 dark:text-white tracking-widest text-center sm:text-left flex-grow font-semibold">
                {contrasena}
              </span>
              
              <div className="flex gap-2 flex-shrink-0">
                <button 
                  onClick={generarContrasena}
                  className="p-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors"
                  title="Generar nueva contraseña"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button 
                  onClick={copiarAlPortapapeles}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold transition-all shadow-sm ${
                    copiado 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {copiado ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Medidor de Fortaleza */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Fortaleza:</span>
              <div className="flex gap-1 flex-grow max-w-[150px]">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 flex-1 rounded-full ${i < fortaleza ? getFortalezaColor() : 'bg-zinc-200 dark:bg-zinc-800'}`}
                  ></div>
                ))}
              </div>
              <span className={`text-xs font-bold ${getFortalezaColor().replace('bg-', 'text-')}`}>{getFortalezaText()}</span>
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800 my-6" />

          {/* Controles */}
          <div className="flex flex-col gap-6">
            
            {/* Slider de Longitud */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Longitud de la contraseña
                </label>
                <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-bold px-3 py-1 rounded-lg">
                  {longitud} caracteres
                </span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="64" 
                value={longitud} 
                onChange={(e) => setLongitud(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-red-600"
              />
            </div>

            {/* Checkboxes de Opciones */}
            <div>
              <label className="font-semibold text-zinc-800 dark:text-zinc-200 mb-3 block">
                Caracteres permitidos
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <label className="flex items-center p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={opciones.mayusculas}
                    onChange={(e) => setOpciones({...opciones, mayusculas: e.target.checked})}
                    className="w-5 h-5 rounded border-zinc-300 text-red-600 focus:ring-red-600"
                  />
                  <span className="ml-3 font-medium text-zinc-700 dark:text-zinc-300">Mayúsculas (A-Z)</span>
                </label>

                <label className="flex items-center p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={opciones.minusculas}
                    onChange={(e) => setOpciones({...opciones, minusculas: e.target.checked})}
                    className="w-5 h-5 rounded border-zinc-300 text-red-600 focus:ring-red-600"
                  />
                  <span className="ml-3 font-medium text-zinc-700 dark:text-zinc-300">Minúsculas (a-z)</span>
                </label>

                <label className="flex items-center p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={opciones.numeros}
                    onChange={(e) => setOpciones({...opciones, numeros: e.target.checked})}
                    className="w-5 h-5 rounded border-zinc-300 text-red-600 focus:ring-red-600"
                  />
                  <span className="ml-3 font-medium text-zinc-700 dark:text-zinc-300">Números (0-9)</span>
                </label>

                <label className="flex items-center p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={opciones.simbolos}
                    onChange={(e) => setOpciones({...opciones, simbolos: e.target.checked})}
                    className="w-5 h-5 rounded border-zinc-300 text-red-600 focus:ring-red-600"
                  />
                  <span className="ml-3 font-medium text-zinc-700 dark:text-zinc-300">Símbolos (!@#$...)</span>
                </label>
                
              </div>
            </div>

          </div>

        </div>
        
        {/* --- CONTENIDO SEO --- */}
        <article className="w-full text-zinc-800 dark:text-zinc-300 space-y-8 text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">Por qué usar un generador de contraseñas local</h2>
            <p className="mb-3">La mayoría de incidentes de seguridad en internet ocurren debido al uso de contraseñas débiles o recicladas. Nuestro generador utiliza la API criptográfica nativa de tu navegador (<code>window.crypto</code>) para asegurar que las contraseñas generadas sean verdaderamente aleatorias e imposibles de predecir.</p>
            <p><strong>Lo más importante:</strong> Tu contraseña generada nunca abandona tu dispositivo. No se envía a ningún servidor, base de datos ni analítica. Es tuya y solo tuya.</p>
          </section>
        </article>

      </div>
    </main>
  );
}