"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";

export default function TextoAPdf() {
  const [texto, setTexto] = useState("");
  
  // Opciones de formato
  const [fuente, setFuente] = useState<"helvetica" | "times" | "courier">("helvetica");
  const [tamanoFuente, setTamanoFuente] = useState<number>(12);
  const [orientacion, setOrientacion] = useState<"portrait" | "landscape">("portrait");

  const [cooldown, setCooldown] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejar la subida de un archivo .txt
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Límite de 100MB (100 * 1024 * 1024 bytes)
    if (file.size > 104857600) {
      setErrorMsg("El archivo supera el límite de 100MB. Intenta con un archivo más pequeño.");
      e.target.value = '';
      return;
    }

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
    if (!texto.trim() || cooldown) return;

    // Activar cooldown de 3 segundos
    setCooldown(true);
    setTimeout(() => setCooldown(false), 3000);

    // Inicializar documento con orientación
    const doc = new jsPDF({ orientation: orientacion });
    
    // Aplicar ajustes de fuente
    doc.setFont(fuente);
    doc.setFontSize(tamanoFuente);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margen = 20;
    const maxAnchoLinea = pageWidth - margen * 2;
    
    // El alto de línea varía según el tamaño de fuente elegido
    const altoLinea = (tamanoFuente * 0.3527) * 1.5; 
    
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

        {errorMsg && (
          <div className="mb-6 w-full max-w-4xl bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center font-medium animate-in fade-in zoom-in duration-300">
            {errorMsg}
          </div>
        )}

        {/* Casos de Uso Frecuentes (SEO Long-Tail) */}
        <div className="w-full max-w-4xl mt-2 mb-10 bg-zinc-100/50 dark:bg-zinc-800/30 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span>💡</span> Casos de uso más populares:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Convertir <strong>apuntes de clase o notas rápidas</strong> a PDF para imprimirlos o compartirlos con compañeros.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Pasar borradores de texto o <strong>contratos simples en .txt</strong> a un documento PDF formal y limpio.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Crear archivos PDF sin descargar programas extra. Todo ocurre <strong>100% en tu navegador</strong> (sin servidores).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              Generar un PDF de lectura rápida <strong>sin marcas de agua</strong> y totalmente gratuito en un clic.
            </li>
          </ul>
        </div>

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
          
          {/* Opciones de Formato */}
          <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 mb-8">
            <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">Ajustes del Documento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Selector de Fuente */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Tipo de letra</label>
                <select 
                  value={fuente} 
                  onChange={(e) => setFuente(e.target.value as any)}
                  className="p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500"
                >
                  <option value="helvetica">Arial / Helvetica (Clásica)</option>
                  <option value="times">Times New Roman (Formal)</option>
                  <option value="courier">Courier (Código)</option>
                </select>
              </div>

              {/* Selector de Tamaño */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Tamaño de letra</label>
                <select 
                  value={tamanoFuente} 
                  onChange={(e) => setTamanoFuente(Number(e.target.value))}
                  className="p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500"
                >
                  <option value={10}>Pequeña (10pt)</option>
                  <option value={12}>Normal (12pt)</option>
                  <option value={16}>Grande (16pt)</option>
                </select>
              </div>

              {/* Selector de Orientación */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Orientación</label>
                <select 
                  value={orientacion} 
                  onChange={(e) => setOrientacion(e.target.value as any)}
                  className="p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500"
                >
                  <option value="portrait">Vertical</option>
                  <option value="landscape">Horizontal</option>
                </select>
              </div>

            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={generarPDF}
              disabled={!texto.trim() || cooldown}
              className="w-full sm:w-2/3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 disabled:active:scale-100 flex items-center justify-center"
            >
              {cooldown ? "Generando..." : "Descargar PDF Ahora"}
            </button>
          </div>
        </div>

        {/* --- CONTENIDO SEO (Para atraer visitas) --- */}
        <article className="w-full text-zinc-800 dark:text-zinc-300 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">¿Cómo convertir texto a PDF online?</h2>
            <p className="mb-4">Convertir tus textos o archivos planos a un documento PDF profesional nunca ha sido tan fácil. Sigue estos sencillos pasos:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Pega tu texto o sube un archivo:</strong> Escribe directamente en el cuadro de texto, pega el contenido desde tu portapapeles, o utiliza el botón "Subir archivo .TXT" para cargar tu documento.</li>
              <li><strong>Ajusta el Formato:</strong> Elige el tipo de letra que mejor se adapte (Arial, Times o Courier), ajusta su tamaño y escoge si quieres imprimir en formato Vertical u Horizontal.</li>
              <li><strong>Genera el PDF:</strong> Haz clic en el botón azul "Descargar PDF Ahora". Tu archivo se generará al instante y se guardará en tu dispositivo con tus preferencias.</li>
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

          <section>
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Preguntas Frecuentes (FAQ)</h2>
            <div className="space-y-4">
              <details className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg cursor-pointer group">
                <summary className="font-semibold text-zinc-900 dark:text-zinc-100">¿Puedo convertir otros formatos como Word o Imágenes?</summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Esta página está optimizada para texto plano (TXT). Pero no te preocupes, en nuestra página principal tienes disponible la herramienta especializada para convertir Imágenes a PDF.</p>
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

          {/* --- SECCIÓN DE COMPARTIR --- */}
          <section className="pb-16 mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-12">
            <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">¿Te ha sido útil esta herramienta?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">Ayúdanos a llegar a más personas compartiéndola con tus amigos o compañeros de estudio/trabajo.</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://api.whatsapp.com/send?text=Mira%20este%20conversor%20gratuito%20de%20Texto%20a%20PDF%20super%20r%C3%A1pido%20y%20seguro%3A%20https%3A%2F%2Fmyutils.com%2Fherramientas%2Ftexto-a-pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-xl transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Compartir por WhatsApp
              </a>
              <a 
                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fmyutils.com%2Fherramientas%2Ftexto-a-pdf&text=%C2%A1He%20descubierto%20esta%20herramienta%20gratuita%20y%20segura%20para%20pasar%20mis%20textos%20a%20PDF%20al%20instante!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white font-medium rounded-xl transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                </svg>
                Compartir en X
              </a>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}
