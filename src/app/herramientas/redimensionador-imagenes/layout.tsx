import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redimensionar Imágenes Online Gratis | OToolbox",
  description: "Redimensiona, cambia el tamaño y recorta tus imágenes de forma gratuita, privada y rápida. Sin subir nada a servidores, todo en tu navegador.",
  keywords: "redimensionar imagenes, cambiar tamaño foto, achicar imagen, agrandar imagen, herramientas imagenes online, gratis, privacidad",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}