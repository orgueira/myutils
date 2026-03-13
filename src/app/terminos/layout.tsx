import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio | OToolbox",
  description: "Condiciones de uso y aviso legal de OToolbox. Conoce las normas de uso de nuestras herramientas gratuitas.",
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}