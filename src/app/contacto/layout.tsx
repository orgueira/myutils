import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto y Sugerencias | TheNinjaBox",
  description: "¿Tienes alguna sugerencia, error que reportar o idea para una nueva herramienta? Contáctanos.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}