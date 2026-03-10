"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function TextoAPdf() {
  const [texto, setTexto] = useState("");

  const generarPDF = () => {
    if (!texto.trim()) return;

    // Crear un nuevo documento PDF (por defecto es A4 vertical)
    const doc = new jsPDF();
    
    // Configuración de la página
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margen = 20;
    const maxAnchoLinea = pageWidth - margen * 2;
    const altoLinea = 10; // Espaciado entre líneas
    
    // Posición inicial (Y)
    let y = margen;

    // Dividir el texto introducido en líneas que quepan dentro del margen de la hoja
    const lineas = doc.splitTextToSize(texto, maxAnchoLinea);

    // Iterar sobre cada línea para escribirla en el PDF
    lineas.forEach((linea: string) => {
      // Si la línea actual va a sobrepasar el borde inferior, crear una nueva página
      if (y > pageHeight - margen) {
        doc.addPage();
        y = margen; // Reiniciar la posición Y al margen superior
      }
      doc.text(linea, margen, y);
      y += altoLinea;
    });

    // Descargar el archivo
    doc.save("texto-convertido.pdf");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Encabezado SEO optimizado (H1 principal) */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-50">
          Conversor de Texto a PDF
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-2xl">
          Convierte instantáneamente cualquier documento de texto, nota o apunte en un archivo PDF con formato estándar (A4) listo para descargar, compartir o imprimir. Rápido, gratis y sin subir tus datos a ningún servidor.
        </p>

        {/* Zona de interacción del usuario */}
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="texto" className="font-medium text-zinc-800 dark:text-zinc-200">
            Pega o escribe tu texto aquí:
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full h-96 p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
            placeholder="Érase una vez en un lugar de la Mancha..."
          />
          
          <button
            onClick={generarPDF}
            disabled={!texto.trim()}
            className="w-full sm:w-auto self-center mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-700 text-white font-semibold rounded-lg shadow transition-colors"
          >
            Descargar como PDF
          </button>
        </div>
      </div>
    </main>
  );
}