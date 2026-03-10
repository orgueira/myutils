"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";

// Tipo para manejar la imagen seleccionada y su previsualización
type ImagenSubida = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function ImagenesAPdf() {
  const [imagenes, setImagenes] = useState<ImagenSubida[]>([]);
  const [generando, setGenerando] = useState(false);
  
  // Opciones de configuración del PDF
  const [orientacion, setOrientacion] = useState<"portrait" | "landscape">("portrait");
  const [tipoMargen, setTipoMargen] = useState<"normal" | "sin-margen">("normal");
  
  // Estado para el Drag & Drop (arrastrar para reordenar)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejar la selección de múltiples imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const nuevosArchivos = Array.from(e.target.files);
    const nuevasImagenes: ImagenSubida[] = nuevosArchivos.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      previewUrl: URL.createObjectURL(file), // Crear URL temporal para previsualizar
    }));

    setImagenes((prev) => [...prev, ...nuevasImagenes]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Eliminar una imagen
  const eliminarImagen = (id: string) => {
    setImagenes((prev) => prev.filter((img) => img.id !== id));
  };

  // ----- Eventos de Drag & Drop (Arrastrar y Soltar) -----
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Truco para hacer transparente el elemento arrastrado
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedIndex(null);
    e.currentTarget.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Necesario para permitir soltar
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    // Reordenar el array
    const nuevasImagenes = [...imagenes];
    const draggedItem = nuevasImagenes[draggedIndex];
    
    nuevasImagenes.splice(draggedIndex, 1);
    nuevasImagenes.splice(dropIndex, 0, draggedItem);
    
    setImagenes(nuevasImagenes);
    setDraggedIndex(null);
  };
  // ------------------------------------------------------

  // Generar el documento PDF
  const generarPDF = async () => {
    if (imagenes.length === 0) return;
    setGenerando(true);

    try {
      // Configurar el PDF con la orientación elegida
      const doc = new jsPDF({
        orientation: orientacion,
        unit: "pt", // Puntos (mejor precisión para calcular imágenes)
        format: "a4"
      });
      
      const margenPt = tipoMargen === "sin-margen" ? 0 : 40; // 40pt es aprox un margen estándar
      
      for (let i = 0; i < imagenes.length; i++) {
        if (i > 0) doc.addPage();
        
        const img = imagenes[i];
        const imgObj = new Image();
        imgObj.src = img.previewUrl;
        
        await new Promise((resolve) => {
          imgObj.onload = resolve;
        });

        // Dimensiones totales de la página
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        
        // Relación de aspecto de la foto
        const imgRatio = imgObj.width / imgObj.height;
        
        // Calcular área útil
        const maxWidth = pdfWidth - (margenPt * 2);
        const maxHeight = pdfHeight - (margenPt * 2);
        
        let finalWidth = maxWidth;
        let finalHeight = finalWidth / imgRatio;

        // Si la foto se sale por debajo, ajustamos por la altura máxima
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = finalHeight * imgRatio;
        }

        // Centrar en la hoja
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        // Añadir al PDF
        doc.addImage(imgObj, "JPEG", x, y, finalWidth, finalHeight);
      }

      doc.save("imagenes-convertidas.pdf");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Hubo un error al procesar las imágenes.");
    } finally {
      setGenerando(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Encabezado SEO */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Convertir Imágenes a PDF
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-2xl">
          Une fotos (JPG, PNG) en un solo documento PDF. Ahora con soporte para <strong>arrastrar y reordenar</strong>, sin límites y procesado en tu navegador de forma segura.
        </p>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-16">
          
          <div className="flex flex-col items-center gap-6">
            
            {/* Input Oculto */}
            <input 
              type="file" 
              multiple 
              accept="image/png, image/jpeg, image/jpg, image/webp" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            
            {/* Botón Drag & Drop gigante */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-purple-400 bg-purple-50/50 hover:bg-purple-50 dark:border-purple-800 dark:bg-purple-900/10 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <span className="font-semibold text-lg">Haz clic aquí para seleccionar imágenes</span>
              <span className="text-sm opacity-80">(Puedes seleccionar varias a la vez)</span>
            </button>

            {/* Galería con Drag & Drop */}
            {imagenes.length > 0 && (
              <div className="w-full mt-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium text-zinc-800 dark:text-zinc-200">
                    Imágenes ({imagenes.length}) - <span className="text-sm text-zinc-500 font-normal">Mantén pulsado y arrastra para reordenar</span>
                  </p>
                  <button 
                    onClick={() => setImagenes([])}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 hover:underline font-medium"
                  >
                    Borrar todas
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {imagenes.map((img, index) => (
                    <div 
                      key={img.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      className="relative group rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-400 aspect-square cursor-move bg-white dark:bg-zinc-800 shadow-sm transition-all"
                    >
                      {/* Icono de arrastre visible solo al pasar el ratón */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white mb-2 shadow-sm">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        <span className="text-white text-xs font-semibold">Arrastrar</span>
                      </div>

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      
                      {/* Número de orden */}
                      <div className="absolute top-2 left-2 bg-zinc-900/80 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full z-20">
                        {index + 1}
                      </div>

                      <button 
                        onClick={(e) => { e.stopPropagation(); eliminarImagen(img.id); }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full z-20 shadow-md transition-colors"
                        title="Eliminar imagen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Opciones Avanzadas del PDF (NUEVO) */}
            {imagenes.length > 0 && (
              <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Orientación de la página</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setOrientacion("portrait")}
                      className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${orientacion === "portrait" ? "bg-purple-100 border-purple-300 text-purple-800 font-medium dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-300" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >
                      📄 Vertical
                    </button>
                    <button 
                      onClick={() => setOrientacion("landscape")}
                      className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${orientacion === "landscape" ? "bg-purple-100 border-purple-300 text-purple-800 font-medium dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-300" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >
                      📰 Horizontal
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Márgenes de las fotos</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTipoMargen("normal")}
                      className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${tipoMargen === "normal" ? "bg-purple-100 border-purple-300 text-purple-800 font-medium dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-300" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >
                      🖼️ Con Margen
                    </button>
                    <button 
                      onClick={() => setTipoMargen("sin-margen")}
                      className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${tipoMargen === "sin-margen" ? "bg-purple-100 border-purple-300 text-purple-800 font-medium dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-300" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >
                      📸 Sin Margen
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Botón de Generar PDF */}
            <button
              onClick={generarPDF}
              disabled={imagenes.length === 0 || generando}
              className="w-full sm:w-2/3 mt-4 px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/30 transition-all transform active:scale-95 disabled:active:scale-100 flex justify-center items-center gap-2"
            >
              {generando ? (
                <span>Procesando PDF...</span>
              ) : (
                <span>Descargar PDF ({imagenes.length} páginas)</span>
              )}
            </button>
          </div>
        </div>

        {/* --- CONTENIDO SEO --- */}
        <article className="w-full text-zinc-800 dark:text-zinc-300 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">¿Cómo juntar y pasar fotos a PDF?</h2>
            <p className="mb-4">Convertir múltiples archivos de imagen (fotos, recibos, DNI) en un único PDF es el método ideal para enviar información. Sigue estos pasos:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Sube tus imágenes:</strong> Haz clic en la caja de arriba para seleccionar todas las fotos (JPG, PNG) que necesites.</li>
              <li><strong>Arrastra para reordenar:</strong> Si el orden de las fotos no es correcto, simplemente mantén pulsado el ratón sobre una foto y arrástrala hacia la izquierda o la derecha para cambiar su posición en el PDF.</li>
              <li><strong>Configura tu página:</strong> Elige si quieres el documento en vertical u horizontal, y si prefieres que la foto ocupe todo el papel o tenga un margen blanco elegante.</li>
              <li><strong>Descarga al instante:</strong> Haz clic en descargar y tu dispositivo procesará las imágenes en segundos.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Ventajas de nuestra herramienta Avanzada</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-purple-600 dark:text-purple-400">Sin servidor, 100% Privado</h3>
                <p className="text-sm">¿Vas a unir fotos de tu DNI o documentos confidenciales? Nuestra web procesa las imágenes directamente en tu navegador usando la memoria de tu móvil o PC. Ningún archivo se envía a servidores externos.</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-purple-600 dark:text-purple-400">Total control sobre el diseño</h3>
                <p className="text-sm">A diferencia de conversores básicos, aquí tú eliges si las páginas van en horizontal o vertical, y decides el tamaño de los márgenes. ¡Ideal para imprimir o presentar trabajos!</p>
              </div>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}