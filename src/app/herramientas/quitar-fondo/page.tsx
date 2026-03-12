"use client";

import { useState, useRef, useCallback } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function QuitarFondoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Checkerboard base64 pattern (ajedrez gris transparente)
  const checkerboardBg = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2NkYGD4z0ABYBw1gGE0DBhGw4BhWIQBAE5yH0GTzNfOAAAAAElFTkSuQmCC')";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadSelectedFile(e.target.files[0]);
    }
  };

  const loadSelectedFile = (selectedFile: File) => {
    // Validar tipo
    if (!selectedFile.type.startsWith("image/")) {
      setError("Por favor, sube un archivo de imagen válido (JPG, PNG).");
      return;
    }

    if (selectedFile.size > 104857600) { // 100MB
      setError("La imagen supera el límite de 100MB. Intenta con una más pequeña para evitar bloqueos.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    // Resetear estados previos
    setResultUrl(null);
    setError(null);
    setFile(selectedFile);
    
    // Crear URL temporal para la previsualización original
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);
  };

  // Handlers para Drag & Drop
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const processImage = async () => {
    if (!originalUrl) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgressText("Cargando modelo de IA (sólo la primera vez toma más tiempo)...");
      setProgressPercent(0);

      const config = {
        progress: (key: string, current: number, total: number) => {
          // El string key nos indica si está bajando el modelo o aplicándolo
          let label = "Procesando";
          if (key.includes("fetch")) label = "Descargando modelo IA";
          if (key.includes("compute")) label = "Separando el fondo";
          
          setProgressText(`${label}...`);
          // Si total existe y es mayor que cero, sacamos porcentaje
          if (total > 0) {
            setProgressPercent(Math.round((current / total) * 100));
          }
        }
      };

      const blob = await removeBackground(originalUrl, config);
      const outputUrl = URL.createObjectURL(blob);
      setResultUrl(outputUrl);
      setProgressText("¡Completado!");
      setProgressPercent(100);
      
    } catch (err) {
      console.error("Error quitando el fondo:", err);
      setError("Ocurrió un error al procesar la imagen. Comprueba que sea una imagen válida o intenta con una resolución menor.");
    } finally {
      setIsProcessing(false);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 3000);
    }
  };

  const resetAll = () => {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
    setIsProcessing(false);
    setProgressPercent(0);
    setProgressText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    if (!resultUrl || cooldown) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    // Nombre del archivo de salida
    const baseName = file ? file.name.substring(0, file.name.lastIndexOf('.')) : "imagen";
    link.download = `${baseName}_sin_fondo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-900 font-[family-name:var(--font-geist-sans)]">
      
      {/* Cabecera */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Quitar <span className="text-purple-600">Fondo</span> de Imágenes
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Sube tu fotografía y nuestra Inteligencia Artificial separará a la persona/objeto principal del fondo automáticamente. Todo 100% privado en tu navegador.
        </p>
      </div>

      {/* Casos de Uso Frecuentes (SEO Long-Tail) */}
      <div className="w-full max-w-4xl mx-auto mt-2 mb-10 bg-zinc-100/50 dark:bg-zinc-800/30 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <span>💡</span> Casos de uso más populares:
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">✓</span>
            Hacer imágenes PNG con fondo transparente para usar en <strong>presentaciones, diapositivas o documentos</strong> formales.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">✓</span>
            Eliminar el fondo de fotos de <strong>productos para vender en Wallapop, Vinted o tiendas online</strong> fácilmente.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">✓</span>
            Recortar a personas para crear <strong>stickers de WhatsApp, miniaturas de YouTube o memes</strong> sin tener Photoshop.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">✓</span>
            Quitar el fondo de tus fotos personales de forma <strong>segura sin subirlas a servidores en la nube</strong> (100% local).
          </li>
        </ul>
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {error && (
          <div className="w-full mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-center">
            {error}
          </div>
        )}

        {!originalUrl ? (
          /* ZONA DRAG AND DROP (Vista 1: Subir Archivo) */
          <div 
            className={`w-full max-w-3xl flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-12 transition-all duration-200 cursor-pointer ${
              isDragging 
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 hover:border-purple-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
              Haz clic o arrastra tu imagen aquí
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Soporta JPG, PNG, WEBP (Hasta 10MB idealmente)
            </p>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={isProcessing || cooldown}
            />
          </div>
        ) : (
          /* ZONA DE PROCESAMIENTO / RESULTADO (Vista 2 y 3) */
          <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch justify-center">
            
            {/* Panel Izquierdo: Original */}
            <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center justify-between">
                <span>Original</span>
                <button 
                  onClick={resetAll}
                  disabled={isProcessing}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                >
                  Subir otra
                </button>
              </h3>
              <div className="flex-1 min-h-[300px] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
                <img 
                  src={originalUrl} 
                  alt="Original" 
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>

              {!resultUrl && !isProcessing && (
                <button
                  onClick={processImage}
                  disabled={cooldown}
                  className="mt-6 w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 text-white font-bold text-lg shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 disabled:active:scale-100 disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                  {cooldown ? "Procesando..." : "Quitar Fondo Mágicamente"}
                </button>
              )}

              {isProcessing && (
                <div className="mt-6 w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-3"></div>
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium text-center">{progressText}</p>
                  {progressPercent > 0 && progressPercent < 100 && (
                    <div className="w-full max-w-xs mt-3 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  )}
                  <p className="text-xs text-zinc-500 mt-2 text-center max-w-sm">La primera vez que uses la herramienta descargará el modelo de IA localmente (~40MB).</p>
                </div>
              )}
            </div>

            {/* Panel Derecho: Resultado */}
            {resultUrl && (
              <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center justify-between">
                  <span>Resultado Sin Fondo</span>
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md">Transparente</span>
                </h3>
                
                <div 
                  className="flex-1 min-h-[300px] flex items-center justify-center rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative"
                  style={{ backgroundImage: checkerboardBg }}
                >
                  <img 
                    src={resultUrl} 
                    alt="Imagen sin fondo" 
                    className="max-w-full max-h-[400px] object-contain drop-shadow-xl"
                  />
                </div>

                <button
                  onClick={handleDownload}
                  disabled={cooldown}
                  className="mt-6 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar PNG
                </button>
              </div>
            )}
            
          </div>
        )}
      </div>

    </div>
  );
}