import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Contraseñas Seguras y Aleatorias | OToolbox",
  description: "Crea contraseñas robustas y seguras al instante. Herramienta 100% gratuita que genera claves localmente en tu navegador sin enviar datos a internet.",
  keywords: "generador contraseñas, password generator, contraseñas seguras, generar claves aleatorias, seguridad",
};

export default function GeneradorContrasenasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}