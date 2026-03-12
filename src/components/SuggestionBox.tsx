"use client";

import { useState } from "react";

export default function SuggestionBox({ category }: { category: string }) {
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    
    // Simula el envío (En el futuro se conectará a un email o BD)
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setSuggestion("");
      
      // Vuelve al estado inicial después de unos segundos
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }, 800);
  };

  return (
    <div className="flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed bg-zinc-50/50 dark:bg-zinc-900/50 justify-center h-full min-h-[220px] transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
      
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in duration-300 h-full">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">🥷</span>
          </div>
          <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">¡Sugerencia anotada!</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Nuestro equipo revisará tu idea.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 mb-1 tracking-tight uppercase">
              <span>💡</span> Buzón de Ideas
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              ¿Qué herramienta de <strong className="font-semibold text-zinc-700 dark:text-zinc-300">{category}</strong> te gustaría ver aquí?
            </p>
          </div>
          
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            disabled={status === "loading"}
            placeholder={`Ej: Un conversor de colores...`}
            className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent resize-none flex-grow mb-3 min-h-[70px] transition-all shadow-sm"
            maxLength={150}
          />
          
          <button 
            type="submit"
            disabled={!suggestion.trim() || status === "loading"}
            className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-auto flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : "Enviar idea"}
          </button>
        </form>
      )}
    </div>
  );
}