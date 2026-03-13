"use client";

import { useState } from "react";
import Link from "next/link";

export default function FormateadorJsonPage() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  // Intentar parsear y formatear el JSON cada vez que cambie el input o el tamaño de indentación
  const formatJson = () => {
    if (!inputJson.trim()) {
      setOutputJson("");
      setErrorMsg("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutputJson(formatted);
      setErrorMsg("");
    } catch (e: any) {
      setOutputJson("");
      setErrorMsg(`Error de sintaxis: ${e.message}`);
    }
  };

  // Minificar el JSON
  const minifyJson = () => {
    if (!inputJson.trim()) return;

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setErrorMsg("");
    } catch (e: any) {
      setErrorMsg(`No se pudo minificar. JSON inválido: ${e.message}`);
    }
  };

  // Copiar el resultado al portapapeles
  const copyToClipboard = async () => {
    if (!outputJson) return;
    try {
      await navigator.clipboard.writeText(outputJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
      alert("No se pudo copiar el texto.");
    }
  };

  // Cargar archivo JSON local
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Límite de ~2MB para archivos de texto JSON
    if (file.size > 2000000) {
      setErrorMsg("El archivo es demasiado grande (Máximo ~2MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputJson(content);
      
      // Auto-formatear al cargar
      try {
        const parsed = JSON.parse(content);
        setOutputJson(JSON.stringify(parsed, null, indentSize));
        setErrorMsg("");
      } catch (err: any) {
        setOutputJson("");
        setErrorMsg(`El archivo contiene JSON inválido: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Resetear el input
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-900">
      
      {/* Botón Volver */}
      <div className="w-full max-w-6xl mb-6">
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

      <div className="w-full max-w-6xl flex flex-col items-center">

        {/* Encabezado SEO */}
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Formateador de JSON
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-2xl">
          Pega, formatea, embellece y valida tu código JSON. Todo se ejecuta 100% en tu navegador para una privacidad total.
        </p>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full bg-white dark:bg-zinc-950 p-4 sm:p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-12">
          
          {/* Controles superiores */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={formatJson}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                Formatear (Beautify)
              </button>
              
              <button 
                onClick={minifyJson}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                Minificar
              </button>

              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Espacios:</label>
                <select 
                  value={indentSize}
                  onChange={(e) => {
                    setIndentSize(Number(e.target.value));
                    if (outputJson && !errorMsg) {
                      try {
                        const parsed = JSON.parse(inputJson);
                        setOutputJson(JSON.stringify(parsed, null, Number(e.target.value)));
                      } catch(e) {}
                    }
                  }}
                  className="bg-transparent text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Botón de Cargar Archivo */}
              <label className="cursor-pointer px-4 py-2 border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded-lg transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                Cargar Archivo
                <input 
                  type="file" 
                  accept=".json,application/json,text/plain" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
              
              <button 
                onClick={() => { setInputJson(""); setOutputJson(""); setErrorMsg(""); }}
                className="px-3 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
              >
                Limpiar todo
              </button>
            </div>
          </div>

          {/* Zona de Error */}
          {errorMsg && (
            <div className="w-full mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div className="font-mono text-sm break-all">{errorMsg}</div>
            </div>
          )}

          {/* Paneles de Editores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input */}
            <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-[#1e1e1e]">
              <div className="bg-zinc-100 dark:bg-[#2d2d2d] px-3 sm:px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between items-center">
                <span>Tu JSON / Input</span>
              </div>
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                maxLength={5000000} // Límite ~5MB
                spellCheck="false"
                placeholder='Pega tu JSON aquí... &#10;{"ejemplo": "hola mundo", "valido": true}'
                className="w-full h-[400px] sm:h-[500px] p-3 sm:p-4 bg-transparent text-zinc-800 dark:text-[#d4d4d4] font-mono text-xs sm:text-sm resize-none outline-none leading-relaxed"
                style={{ tabSize: indentSize }}
              />
            </div>

            {/* Output */}
            <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-[#1e1e1e] relative">
              <div className="bg-zinc-100 dark:bg-[#2d2d2d] px-3 sm:px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between items-center">
                <span>Resultado</span>
                
                {outputJson && (
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold lowercase tracking-normal"
                  >
                    {copied ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                        Copiar JSON
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <textarea
                readOnly
                value={outputJson}
                placeholder="El JSON formateado aparecerá aquí..."
                spellCheck="false"
                className="w-full h-[400px] sm:h-[500px] p-3 sm:p-4 bg-transparent text-zinc-800 dark:text-[#9cdcfe] font-mono text-xs sm:text-sm resize-none outline-none leading-relaxed"
              />
            </div>

          </div>
        </div>

        {/* --- CONTENIDO SEO --- */}
        <article className="w-full max-w-4xl text-zinc-800 dark:text-zinc-300 space-y-8 pb-12 text-sm sm:text-base">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">¿Qué es el Formateador JSON?</h2>
            <p className="mb-4">JSON (JavaScript Object Notation) es el formato estándar más utilizado para el intercambio de datos entre servidores y aplicaciones web. Sin embargo, a menudo los datos JSON vienen en una sola línea (minificados) para ahorrar espacio, lo que los hace ilegibles para un ser humano.</p>
            <p>Nuestra herramienta te permite pegar tu código en bruto y <strong>darle un formato bonito y estructurado (indentado)</strong> para que puedas leerlo, analizarlo y encontrar errores fácilmente. También funciona como validador: si falta una coma o hay una llave mal cerrada, te indicaremos dónde está el error de sintaxis.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Totalmente Privado y Seguro</h2>
            <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
              <p className="text-sm">A diferencia de otras webs, en esta página <strong>tu código JSON NUNCA sale de tu ordenador</strong>. Todo el proceso de parseo y validación ocurre localmente en tu navegador usando JavaScript nativo. Esto es vital si estás trabajando con archivos JSON que contienen información sensible como bases de datos de clientes, tokens de acceso o contraseñas.</p>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}