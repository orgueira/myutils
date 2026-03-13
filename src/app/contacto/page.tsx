"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "sugerencia",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          // Prefijamos el topic con "Contacto y Sugerencias" para identificar de dónde viene en Vercel
          topic: `Contacto y Sugerencias - ${formData.topic}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", topic: "sugerencia", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        // En caso de error de la API, podemos mostrar un alert o gestionar el estado
        console.error("Error al enviar el formulario");
        setStatus("idle");
        alert("Hubo un problema enviando tu mensaje. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Excepción de red al enviar contacto:", error);
      setStatus("idle");
      alert("Hubo un problema de conexión. Inténtalo de nuevo más tarde.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-900 font-[family-name:var(--font-geist-sans)]">
      
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        
        {/* Navegación para volver atrás */}
        <Link 
          href="/" 
          className="self-start mb-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Volver al inicio
        </Link>

        {/* Cabecera */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Contacto y <span className="text-blue-600 dark:text-blue-400">Sugerencias</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            OToolbox está construido para vosotros. Si notas algún error, tienes una idea para una herramienta nueva o simplemente quieres saludar, rellena el formulario.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-sm">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🧰</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mb-2">¡Mensaje enviado con éxito!</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Hemos recibido tu mensaje correctamente. Nuestro equipo toolbox lo leerá lo antes posible. ¡Gracias por ayudarnos a mejorar!
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-2.5 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 font-semibold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Tu nombre (opcional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="toolbox Anónimo"
                    className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#1e1e1e] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Tu email (opcional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="para-responderte@email.com"
                    className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#1e1e1e] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="topic" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  ¿Sobre qué nos escribes?
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#1e1e1e] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                  required
                >
                  <option value="sugerencia">💡 Sugerir una nueva herramienta</option>
                  <option value="bug">🐛 Reportar un error (Bug)</option>
                  <option value="mejora">🚀 Proponer una mejora</option>
                  <option value="otro">💬 Otro asunto</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  Tu mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Explícanos tu idea con todo el detalle que quieras..."
                  required
                  className="w-full min-h-[150px] text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-[#1e1e1e] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "loading" || !formData.message.trim()}
                className="mt-4 w-full py-3.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando mensaje...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Enviar Mensaje Seguro
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}