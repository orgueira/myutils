"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export default function RedimensionadorImagenesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) return;
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        const img = new Image();
        img.onload = () => {
          setOriginalSize({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = url;
      }
    }
  }, []);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (maintainRatio && originalSize.width > 0) {
      setHeight(Math.round(newWidth * (originalSize.height / originalSize.width)));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (maintainRatio && originalSize.height > 0) {
      setWidth(Math.round(newHeight * (originalSize.width / originalSize.height)));
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    setIsProcessing(true);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Intentar exportar con la misma extensión si es jpeg/webp/png
      let type = "image/png";
      let ext = ".png";
      if (selectedFile?.type === "image/jpeg") { type = "image/jpeg"; ext = ".jpg"; }
      else if (selectedFile?.type === "image/webp") { type = "image/webp"; ext = ".webp"; }
      
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsProcessing(false);
          return;
        }
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `redimensionado_${width}x${height}${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
        setIsProcessing(false);
      }, type, 0.9);
    };
    img.src = previewUrl;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header de la herramienta */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1 w-fit mb-2">
            &larr; Volver al inicio
          </Link>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Redimensionar Imágenes
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Cambia el tamaño de tus fotos rápidamente sin perder proporción y en local (100% privado).
          </p>
        </div>

        {/* Workspace */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          
          {/* Si NO hay archivo cargado */}
          {!selectedFile && (
            <div 
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <span className="text-5xl">🖼️</span>
              <div>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Haz clic o arrastra tu imagen aquí</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Soporta JPG, PNG, WEBP</p>
              </div>
              <input 
                id="fileUpload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <button className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm">
                Seleccionar Imagen
              </button>
            </div>
          )}

          {/* Si HAY archivo cargado */}
          {selectedFile && previewUrl && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Preview */}
              <div className="flex-1 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 relative overflow-hidden">
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-mono z-10">
                  Original: {originalSize.width}x{originalSize.height}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  ref={imgRef}
                  src={previewUrl} 
                  alt="Vista previa" 
                  className="max-h-[300px] w-auto object-contain rounded drop-shadow-md"
                />
              </div>

              {/* Controles */}
              <div className="w-full md:w-80 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200">Ajustes de Tamaño</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Introduce el nuevo ancho o alto en píxeles.</p>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Ancho (px)</label>
                    <input 
                      type="number" 
                      value={width || ""}
                      onChange={handleWidthChange}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="pt-5 text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Alto (px)</label>
                    <input 
                      type="number" 
                      value={height || ""}
                      onChange={handleHeightChange}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input 
                    type="checkbox" 
                    checked={maintainRatio}
                    onChange={(e) => setMaintainRatio(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    Mantener proporción original
                  </span>
                </label>

                <div className="mt-auto flex flex-col gap-2 pt-4">
                  <button 
                    onClick={handleDownload}
                    disabled={isProcessing || width <= 0 || height <= 0}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isProcessing ? "Procesando..." : "Descargar Imagen"}
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl transition-all text-sm"
                  >
                    Elegir otra imagen
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info SEO */}
        <div className="pt-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
            <h2 className="text-zinc-900 dark:text-white font-bold text-xl mb-4">Redimensionador de Imágenes 100% Local</h2>
            <p className="mb-4 text-sm leading-relaxed">
              Modifica las dimensiones de tus imágenes, fotos o capturas de forma segura y privada. 
              Al procesar el archivo usando la potencia de tu navegador mediante HTML5, tu foto original nunca se envía a ningún servidor.
            </p>
            <h3 className="text-zinc-900 dark:text-white font-semibold text-lg mt-6 mb-2">¿Cómo funciona?</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Sube tu imagen (JPG, PNG o WEBP).</li>
              <li>El sistema detectará automáticamente el ancho y alto original.</li>
              <li>Introduce el nuevo tamaño en la caja correspondiente. Si marcas la opción <em>"Mantener proporción"</em>, se calculará el otro valor por ti automáticamente para que no se deforme.</li>
              <li>Pulsa en <strong>Descargar</strong> y la imagen redimensionada se guardará al instante en tu dispositivo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}