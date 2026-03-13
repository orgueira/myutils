import Link from "next/link";

export default function PrivacidadPage() {
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
            Política de <span className="text-blue-600 dark:text-blue-400">Privacidad</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Última actualización: <strong>{new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</strong>
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300">
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Nuestra filosofía: La privacidad por diseño</h2>
          <p className="mb-6">
            En <strong>TheNinjaBox</strong>, creemos que tus archivos y datos te pertenecen solo a ti. Por eso, hemos diseñado nuestras herramientas bajo el principio de <em>"Procesamiento Local"</em> (Local-First).
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. ¿Qué datos procesamos y cómo?</h2>
          
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-6 mb-3">2.1. Archivos (Imágenes, Textos, JSON)</h3>
          <p className="mb-4">
            La gran mayoría de nuestras herramientas (Conversor de PDF, Contador de palabras, Formateador JSON) <strong>se ejecutan de forma nativa en tu navegador web</strong>.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Tus archivos <strong>NUNCA</strong> se suben a nuestros servidores.</li>
            <li>Nosotros no podemos ver, leer, almacenar ni acceder a los documentos que procesas.</li>
            <li>Todo el procesamiento consume recursos de tu propio dispositivo.</li>
          </ul>

          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-6 mb-3">2.2. Herramienta "Quitar Fondo" (Híbrida)</h3>
          <p className="mb-4">
            Nuestra herramienta para eliminar fondos de imágenes utiliza un enfoque híbrido:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Modo Nube (Alta Calidad):</strong> Para ofrecer resultados profesionales, tu imagen puede ser enviada a través de una API segura a un proveedor de terceros (ej. <em>Remove.bg</em>). Si esto ocurre, la imagen es procesada por sus servidores y devuelta a ti. Según las políticas de estos proveedores, las imágenes se procesan temporalmente y no se almacenan para otros fines.</li>
            <li><strong>Modo Local (Inteligencia Artificial Local):</strong> Si los créditos de la API se agotan, la herramienta descarga un modelo de IA en tu navegador (caché) y procesa la imagen 100% localmente, sin enviar la foto a ningún servidor externo.</li>
          </ul>

          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-6 mb-3">2.3. Formularios de Contacto y Sugerencias</h3>
          <p className="mb-4">
            Si decides utilizar nuestro formulario de contacto o buzón de ideas, recopilaremos la información que tú decidas proporcionarnos (como tu nombre, email y mensaje). 
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Finalidad:</strong> Únicamente para leer tus sugerencias, solucionar errores o responderte si lo solicitas.</li>
            <li><strong>Almacenamiento:</strong> Estos mensajes se envían directamente a nuestra bandeja de entrada de correo electrónico. No creamos bases de datos de marketing con ellos ni vendemos tu email a terceros.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Cookies y Rastreo (Analytics)</h2>
          <p className="mb-6">
            Para entender qué herramientas son las más útiles y poder mejorar la plataforma, podemos utilizar servicios de analítica web (como Google Analytics, Vercel Analytics o alternativas respetuosas con la privacidad). Estas herramientas pueden recopilar datos anónimos como tu país, navegador, o páginas visitadas. No utilizamos cookies publicitarias intrusivas.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Tus Derechos</h2>
          <p className="mb-6">
            Puesto que no almacenamos cuentas de usuario ni guardamos tus archivos, no disponemos de bases de datos de las que debas borrarte. Si en algún momento te comunicaste con nosotros vía email/formulario y deseas que borremos esa conversación, puedes solicitarlo contactándonos.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. Contacto</h2>
          <p className="mb-6">
            Si tienes cualquier duda sobre esta Política de Privacidad, el manejo de tus datos o el funcionamiento técnico de las herramientas, por favor, utiliza nuestro formulario de la página de <strong><Link href="/contacto" className="text-blue-600 dark:text-blue-400 hover:underline">Contacto</Link></strong>.
          </p>
        </div>
      </div>
    </div>
  );
}