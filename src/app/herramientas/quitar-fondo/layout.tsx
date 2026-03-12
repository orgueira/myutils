import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quitar Fondo de Imágenes Gratis, con IA y Sin Registro | TheNinjaBox",
  description: "Elimina el fondo de fotos automáticamente usando Inteligencia Artificial sin subir la foto a internet. Completamente gratis, ilimitado y sin publicidad.",
  keywords: "quitar fondo gratis, IA quitar fondo sin limite, remover fondo de foto online, hacer imagen transparente sin registro, borrar fondo sin marcas de agua",
};

export default function QuitarFondoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}