import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio | TheNinjaBox",
  description: "Condiciones de uso y aviso legal de TheNinjaBox. Conoce las normas de uso de nuestras herramientas gratuitas.",
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}