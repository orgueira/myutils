import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formateador y Validador de JSON Online | Herramientas Gratuitas",
  description: "Formatea, embellece y valida tu código JSON al instante. Herramienta 100% gratuita, privada y ejecutada en tu navegador sin necesidad de registros.",
  keywords: "formateador json, validar json, json beautifier, embellecedor json, limpiar json, corregir json online, json format",
  openGraph: {
    title: "Formateador JSON Online - Rápido, Seguro y Privado",
    description: "Ordena, formatea y valida código JSON con un clic. La forma más segura de trabajar con JSON sin subir tus datos a servidores externos.",
    url: "https://myutils.com/herramientas/formateador-json",
    type: "website",
  },
  alternates: {
    canonical: "https://myutils.com/herramientas/formateador-json",
  },
};

export default function FormateadorJsonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}