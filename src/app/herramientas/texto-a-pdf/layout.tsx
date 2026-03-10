import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversor de Texto a PDF Online Gratis | MyUtils",
  description: "Convierte instantáneamente cualquier texto, nota o apunte en un archivo PDF con formato A4. Rápido, seguro (el texto no se envía a ningún servidor), gratuito y sin registro.",
  keywords: "conversor texto pdf, txt a pdf, crear pdf online, texto a pdf gratis, convertidor pdf, pasar texto a pdf",
  openGraph: {
    title: "Conversor de Texto a PDF Online Gratis",
    description: "Convierte cualquier texto en un archivo PDF al instante.",
    type: "website",
  }
};

export default function TextoAPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}