import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quitar Fondo de Imágenes Gratis | TheNinjaBox",
  description: "Elimina el fondo de cualquier imagen o fotografía de forma automática mediante IA directamente en tu navegador. 100% privado y seguro.",
  keywords: "quitar fondo, remover fondo, eliminar fondo imagen, hacer transparente, png transparente, inteligencia artificial, local",
};

export default function QuitarFondoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}