import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | OToolbox",
  description: "Nuestra política de privacidad es sencilla: todo se procesa en tu navegador. Conoce cómo protegemos tus datos y garantizamos tu privacidad.",
};

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}