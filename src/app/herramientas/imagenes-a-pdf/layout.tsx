import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unir Imágenes a PDF Online y Gratis | OToolbox",
  description: "Convierte fotos e imágenes (JPG, PNG) a documento PDF al instante. Herramienta 100% gratis, sin anuncios, sin subir archivos y sin límite de uso.",
  keywords: "imagenes a pdf gratis, unir imagenes sin publicidad, convertir jpg a pdf seguro, png a pdf privado, juntar fotos en pdf sin marcas de agua",
  openGraph: {
    title: "Unir Imágenes a PDF Online, Gratis y Sin Publicidad",
    description: "Pasa tus fotos a un archivo PDF único en segundos, gratis y 100% privado en tu navegador.",
    type: "website",
  }
};

export default function ImagenesAPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Datos Estructurados de Aplicación (SoftwareApplication)
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Conversor Avanzado de Imágenes a PDF",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": "Herramienta gratuita para unir múltiples imágenes (JPG, PNG) en un solo documento PDF. Procesamiento seguro en el navegador sin subir los archivos a internet.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  // Datos Estructurados de Preguntas Frecuentes (FAQPage)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué formatos de imagen acepta el conversor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes convertir los formatos más comunes, incluyendo JPG, JPEG y PNG. El sistema generará el PDF automáticamente independientemente del formato original de cada imagen individual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se reduce la calidad de las imágenes al pasar a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El sistema ajusta las dimensiones de las fotos para que encajen perfectamente en las medidas estándar de una hoja A4. Si la foto original era extremadamente grande, se escala al A4, pero mantendrá una alta nitidez óptima para su lectura o impresión."
        }
      },
      {
        "@type": "Question",
        "name": "¿El PDF tendrá logos o marcas de agua de la web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jamás. Nuestra herramienta de conversión de fotos a PDF es totalmente gratuita y limpia. No insertamos marcas de agua ni publicidad en tus documentos generados."
        }
      }
    ]
  };

  return (
    <>
      {/* Inyección de Datos Estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}