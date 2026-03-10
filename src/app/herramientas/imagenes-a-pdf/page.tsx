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
    // Limpiar input para poder seleccionar el mismo archivo si se elimina
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Eliminar una imagen de la lista
  const eliminarImagen = (id: string) => {
    setImagenes((prev) => prev.filter((img) => img.id !== id));
  };

  // Generar el documento PDF
  const generarPDF = async () => {
    if (imagenes.length === 0) return;
    setGenerando(true);

    try {
      const doc = new jsPDF();
      
      for (let i = 0; i < imagenes.length; i++) {
        // Añadir nueva página a partir de la segunda imagen
        if (i > 0) doc.addPage();
        
        const img = imagenes[i];
        
        // Crear un objeto Image de HTML para obtener sus dimensiones reales
        const imgObj = new Image();
        imgObj.src = img.previewUrl;
        
        await new Promise((resolve) => {
          imgObj.onload = resolve;
        });

        // Dimensiones del PDF (A4 por defecto)
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        
        // Calcular la relación de aspecto para no deformar la imagen
        const imgRatio = imgObj.width / imgObj.height;
        let finalWidth = pdfWidth - 20; // Margen de 10px a cada lado
        let finalHeight = finalWidth / imgRatio;

        // Si la imagen ajustada a lo ancho se sale por abajo, ajustar por altura
        if (finalHeight > pdfHeight - 20) {
          finalHeight = pdfHeight - 20; // Margen de 10px arriba y abajo
          finalWidth = finalHeight * imgRatio;
        }

        // Centrar la imagen en la página
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        // Añadir imagen al PDF (asumimos formato genérico como JPEG o WebP soportado por jsPDF)
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
        
        {/* Encabezado SEO optimizado */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Convertir Imágenes a PDF
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-2xl">
          Une fotos, capturas o cualquier archivo de imagen (JPG, PNG) en un solo documento PDF. Fácil, rápido y procesado directamente en tu dispositivo sin subirlo a la nube.
        </p>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-16">
          
          <div className="flex flex-col items-center gap-6">
            
            {/* Botón de subida gigante (estilo drag&drop visual) */}
            <input 
              type="file" 
              multiple 
              accept="image/png, image/jpeg, image/jpg, image/webp" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-2/3 h-32 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-900/10 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="font-semibold text-lg">Seleccionar Imágenes</span>
              <span className="text-sm opacity-80">(Soporta JPG y PNG)</span>
            </button>

            {/* Vista previa de imágenes seleccionadas */}
            {imagenes.length > 0 && (
              <div className="w-full mt-4">
                <p className="font-medium text-zinc-700 dark:text-zinc-300 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  Imágenes seleccionadas ({imagenes.length}):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {imagenes.map((img) => (
                    <div key={img.id} className="relative group rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-square">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => eliminarImagen(img.id)}
                        className="absolute top-1 right-1 bg-red-500/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Eliminar imagen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Botón de Generar PDF */}
            <button
              onClick={generarPDF}
              disabled={imagenes.length === 0 || generando}
              className="w-full sm:w-2/3 mt-6 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 disabled:active:scale-100 flex justify-center items-center gap-2"
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
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">¿Cómo pasar tus fotos e imágenes a PDF?</h2>
            <p className="mb-4">Convertir múltiples archivos de imagen (como fotos del móvil, recibos escaneados o capturas de pantalla) en un único documento PDF es el método ideal para organizar o enviar información. Sigue estos pasos:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Sube tus imágenes:</strong> Haz clic en la caja de arriba para buscar en tu dispositivo y seleccionar las fotos JPG, PNG o WebP que quieras incluir. Puedes seleccionar varias a la vez.</li>
              <li><strong>Revisa el orden:</strong> Verás una miniatura de cada foto que hayas seleccionado. Si te has equivocado con alguna, pulsa la X roja sobre ella para eliminarla de la lista.</li>
              <li><strong>Genera tu PDF:</strong> Haz clic en el botón azul para crear tu documento. Cada foto ocupará una página entera y se ajustará automáticamente para no deformarse.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Ventajas de nuestra herramienta de Imágenes a PDF</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Total Privacidad</h3>
                <p className="text-sm">Tus fotos personales o documentos confidenciales nunca abandonan tu navegador. Nuestro código procesa las imágenes y genera el PDF usando la memoria de tu propio dispositivo. ¡Nadie más las ve!</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Varias fotos en un solo archivo</h3>
                <p className="text-sm">¿Te piden que envíes los deberes, el DNI por las dos caras o varios justificantes de pago? Únelos todos en un solo archivo PDF limpio y ordenado para evitar adjuntar decenas de imágenes sueltas.</p>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Preguntas Frecuentes (FAQ)</h2>
            <div className="space-y-4">
              <details className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg cursor-pointer group">
                <summary className="font-semibold text-zinc-900 dark:text-zinc-100">¿Qué formatos de imagen acepta el conversor?</summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Puedes convertir los formatos más comunes, incluyendo JPG, JPEG y PNG. El sistema generará el PDF automáticamente independientemente del formato original de cada imagen individual.</p>
              </details>
              <details className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg cursor-pointer group">
                <summary className="font-semibold text-zinc-900 dark:text-zinc-100">¿Se reduce la calidad de las imágenes al pasar a PDF?</summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">El sistema ajusta las dimensiones de las fotos para que encajen perfectamente en las medidas estándar de una hoja A4. Si la foto original era extremadamente grande, se escala al A4, pero mantendrá una alta nitidez óptima para su lectura o impresión.</p>
              </details>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}