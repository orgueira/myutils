import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertir Imágenes a PDF Online Gratis | MyUtils",
  description: "Convierte tus fotos e imágenes (JPG, PNG) a documento PDF al instante. Une varias imágenes en un solo PDF. Seguro, privado y gratis.",
  keywords: "imagenes a pdf, pasar foto a pdf, convertir jpg a pdf, png a pdf, juntar imagenes en pdf",
  openGraph: {
    title: "Convertir Imágenes a PDF Online Gratis",
    description: "Une tus fotos e imágenes en un solo archivo PDF al instante y de forma 100% segura.",
    type: "website",
  }
};

export default function ImagenesAPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}