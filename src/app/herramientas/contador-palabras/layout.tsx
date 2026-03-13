import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contador de Palabras y Caracteres Online Gratis | OToolbox",
  description: "Cuenta el número exacto de palabras, caracteres, frases y párrafos de cualquier texto al instante. Herramienta 100% gratuita, privada y sin publicidad.",
  keywords: "contador de palabras, contar caracteres, contador de letras gratis, cuantas palabras tiene un texto, contar parrafos, sin anuncios",
  openGraph: {
    title: "Contador de Palabras y Caracteres Online Gratis y Privado",
    description: "Cuenta palabras y caracteres de tus textos en tiempo real. Todo se procesa en tu navegador para máxima privacidad.",
    type: "website",
  }
};

export default function ContadorPalabrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Datos Estructurados de Aplicación (SoftwareApplication)
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Contador de Palabras y Caracteres",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": "Herramienta gratuita para contar palabras, caracteres, oraciones y párrafos de cualquier texto en tiempo real.",
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
        "name": "¿El texto que escribo o pego se guarda en algún servidor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutamente no. OToolbox procesa todo el texto localmente en tu propio navegador. Nadie más tiene acceso a lo que escribes, garantizando total privacidad para tus ensayos, artículos o documentos confidenciales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuenta los espacios como caracteres?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestra herramienta te muestra ambas métricas por separado: caracteres incluyendo espacios, y caracteres sin incluir los espacios, para que tengas el control total."
        }
      }
    ]
  };

  return (
    <>
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