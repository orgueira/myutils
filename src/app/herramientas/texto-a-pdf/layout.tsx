import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversor de Texto a PDF Online 100% Gratis | OToolbox",
  description: "Convierte cualquier texto o archivo txt en un documento PDF al instante. Herramienta totalmente gratuita, sin publicidad, sin marcas de agua y sin registro.",
  keywords: "conversor texto pdf sin limite, txt a pdf gratis, crear pdf online sin publicidad, pasar texto a pdf seguro",
  openGraph: {
    title: "Conversor de Texto a PDF Online Gratis y Sin Publicidad",
    description: "Convierte cualquier texto en un archivo PDF al instante, de manera segura y gratuita.",
    type: "website",
  }
};

export default function TextoAPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Datos Estructurados de Aplicación (SoftwareApplication)
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Conversor de Texto y TXT a PDF Online",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": "Convierte tus archivos planos TXT, apuntes o bloques de texto a un documento PDF profesional directamente desde el navegador de forma privada.",
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
        "name": "¿Puedo convertir otros formatos como Word o Imágenes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Esta página está optimizada para texto plano (TXT). Pero no te preocupes, en nuestra página principal tienes disponible la herramienta especializada para convertir Imágenes a PDF."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hay un límite de palabras para convertir a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No imponemos un límite estricto de palabras. Puedes convertir apuntes largos o notas cortas. La herramienta creará automáticamente las páginas necesarias en el documento PDF."
        }
      },
      {
        "@type": "Question",
        "name": "¿El PDF generado tiene marcas de agua?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Al ser una herramienta 100% gratuita y sin publicidad, tu documento PDF se generará completamente limpio, sin marcas de agua, ni páginas extra promocionales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Necesito crearme una cuenta para usarlo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, en OToolbox no pedimos registro ni correos electrónicos. Entras, conviertes tu archivo y te lo descargas gratis y sin interrupciones publicitarias."
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