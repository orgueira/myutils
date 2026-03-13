import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-900 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-3xl mx-auto flex flex-col">
        
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
        <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Términos de <span className="text-blue-600 dark:text-blue-400">Servicio</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Última actualización: <strong>{new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</strong>
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300">
          
          <p className="mb-6">
            Bienvenido a <strong>OToolbox</strong>. Al acceder y utilizar este sitio web y sus herramientas, aceptas cumplir con los siguientes Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no deberías usar nuestra web.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Uso del Servicio</h2>
          <p className="mb-4">
            OToolbox proporciona un conjunto de herramientas web gratuitas (en adelante, "el Servicio") orientadas al procesamiento de texto e imágenes. 
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Aceptas usar el Servicio únicamente para fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso de este Servicio por parte de cualquier otra persona.</li>
            <li>No debes usar nuestras herramientas para procesar imágenes, textos o documentos que promuevan el odio, la violencia, la explotación infantil, o que violen derechos de autor (copyright).</li>
            <li>Cualquier intento de abusar de la infraestructura, como ataques de denegación de servicio (DDoS) o ingeniería inversa de las APIs de terceros utilizadas, está estrictamente prohibido.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Disponibilidad y Responsabilidad</h2>
          <p className="mb-4">
            El Servicio se proporciona "tal cual" (<em>as is</em>) y "según disponibilidad".
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>OToolbox es un proyecto gratuito</strong>. No garantizamos que la web esté libre de errores, interrupciones o que cumpla con tus requisitos específicos de rendimiento.</li>
            <li>No nos hacemos responsables de la pérdida de datos. Como la mayoría de herramientas operan en tu propio navegador, asegúrate de guardar copias de seguridad de tus documentos antes de procesarlos.</li>
            <li>Las herramientas híbridas que dependen de cuotas gratuitas de terceros (como la eliminación de fondos) pueden dejar de ofrecer resultados de "alta calidad" si se agotan los límites, volviendo automáticamente al modelo local. No garantizamos la disponibilidad continua de las APIs de terceros.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Propiedad Intelectual</h2>
          <p className="mb-6">
            Nosotros no reclamamos ninguna propiedad sobre los textos, imágenes o documentos que decidas procesar usando OToolbox. Tú mantienes todos los derechos (incluido el copyright) sobre tu material.
            El diseño del sitio web, el código, el logotipo y la marca OToolbox son propiedad exclusiva de los creadores de esta plataforma.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Enlaces de Terceros</h2>
          <p className="mb-6">
            Nuestra web puede contener enlaces a sitios web o servicios de terceros. OToolbox no asume ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. Modificaciones</h2>
          <p className="mb-6">
            Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento, así como de añadir nuevas herramientas o eliminar existentes sin previo aviso. Es tu responsabilidad revisar esta página periódicamente.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">6. Contacto</h2>
          <p className="mb-6">
            Si tienes alguna pregunta sobre estos Términos, puedes comunicarte con nosotros a través de nuestro <strong><Link href="/contacto" className="text-blue-600 dark:text-blue-400 hover:underline">Formulario de Contacto</Link></strong>.
          </p>
        </div>
      </div>
    </div>
  );
}