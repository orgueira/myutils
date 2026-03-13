import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de UUID v4 Online | OToolbox",
  description: "Genera identificadores únicos universales (UUID / GUID) v4 al instante. Herramienta para desarrolladores gratuita, segura y sin registro.",
  keywords: "generador uuid, uuid v4 generator, guid generator, identificador unico, herramientas desarrollador",
};

export default function GeneradorUUIDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}