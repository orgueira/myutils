"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";

export default function TextoAPdf() {
  const [texto, setTexto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejar la subida de un archivo .txt
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evento) => {
      const contenido = evento.target?.result;
      if (typeof contenido === "string") {
        setTexto(contenido);
      }
    };
    reader.readAsText(file);
  };

  const generarPDF = () => {
    if (!texto.trim()) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margen = 20;
    const maxAnchoLinea = pageWidth - margen * 2;
    const altoLinea = 10;
    
    let y = margen;
    const lineas = doc.splitTextToSize(texto, maxAnchoLinea);

    lineas.forEach((linea: string) => {
      if (y > pageHeight - margen) {
        doc.addPage();
        y = margen;
      }
      doc.text(linea, margen, y);
      y += altoLinea;
    });

    doc.save("documento-convertido.pdf");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Encabezado SEO optimizado */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
          Conversor de Texto y TXT a PDF
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-2xl">
          Convierte tus notas, apuntes o archivos de texto plano (.txt) a un documento PDF con formato perfecto al instante. Herramienta 100% gratuita, segura y sin registro.
        </p>

        {/* --- LA HERRAMIENTA --- */}
        <div className="w-full bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <label htmlFor="texto" className="font-semibold text-zinc-800 dark:text-zinc-200 text-lg">
              Escribe, pega tu texto o sube un archivo:
            </label>
            
            {/* Botón oculto de subida y botón visual */}
            <input 
              type="file" 
              accept=".txt" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Subir archivo .TXT
            </button>
          </div>

          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full h-80 p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none resize-y mb-6"
            placeholder="Pega tu texto aquí o utiliza el botón superior para cargar un documento de texto..."
          />
          
          <div className="flex justify-center">
            <button
              onClick={generarPDF}
              disabled={!texto.trim()}
              className="w-full sm:w-2/3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 disabled:active:scale-100"
            >
              Descargar PDF Ahora
            </button>
          </div>
        </div>

        {/* --- CONTENIDO SEO (Para atraer visitas) --- */}
        <article className="w-full text-zinc-800 dark:text-zinc-300 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">¿Cómo convertir texto a PDF online?</h2>
            <p className="mb-4">Convertir tus textos o archivos planos a un documento PDF profesional nunca ha sido tan fácil. Sigue estos tres sencillos pasos:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Pega tu texto o sube un archivo:</strong> Escribe directamente en el cuadro de texto, pega el contenido desde tu portapapeles, o utiliza el botón "Subir archivo .TXT" para cargar tu documento.</li>
              <li><strong>Revisa el contenido:</strong> Asegúrate de que el texto esté tal y como lo deseas. Nuestra herramienta respetará los saltos de línea.</li>
              <li><strong>Genera el PDF:</strong> Haz clic en el botón azul "Descargar PDF Ahora". Tu archivo se generará al instante en formato A4 y se guardará en tu dispositivo.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Ventajas de nuestro conversor TXT a PDF</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">100% Privado y Seguro</h3>
                <p className="text-sm">A diferencia de otras herramientas, tu texto nunca se envía a un servidor. Toda la conversión se realiza directamente en tu navegador. Tus datos son solo tuyos.</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Gratis y Sin Registro</h3>
                <p className="text-sm">No necesitas crear una cuenta, introducir un correo electrónico ni pagar suscripciones. Es una utilidad gratuita pensada para hacerte la vida más fácil.</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Rápido y Sin Esperas</h3>
                <p className="text-sm">La generación del PDF es instantánea, sin colas de procesamiento ni límites de uso diarios. Convierte tantos textos como necesites.</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">Formato Estándar</h3>
                <p className="text-sm">El archivo resultante es un PDF con formato de página A4 clásico, ideal para imprimir, adjuntar en correos electrónicos o presentar trabajos.</p>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Preguntas Frecuentes (FAQ)</h2>
            <div className="space-y-4">
              <details className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg cursor-pointer group">
                <summary className="font-semibold text-zinc-900 dark:text-zinc-100">¿Puedo convertir otros formatos como Word o Imágenes?</summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Esta herramienta específica está optimizada para texto plano (TXT). Estamos trabajando para añadir herramientas específicas para convertir Word a PDF e Imágenes a PDF en nuestra página principal muy pronto.</p>
              </details>
              <details className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg cursor-pointer group">
                <summary className="font-semibold text-zinc-900 dark:text-zinc-100">¿Hay un límite de palabras para convertir a PDF?</summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">No imponemos un límite estricto de palabras. Puedes convertir apuntes largos o notas cortas. La herramienta creará automáticamente las páginas necesarias en el documento PDF.</p>
              </details>
              <details className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg cursor-pointer group">
                <summary className="font-semibold text-zinc-900 dark:text-zinc-100">¿El PDF generado tiene marcas de agua?</summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">No, tu documento PDF se generará completamente limpio, sin marcas de agua ni logotipos promocionales. Es apto para uso profesional o académico.</p>
              </details>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}