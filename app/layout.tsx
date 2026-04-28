import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mbmultimarcasinfantil.com.br"),
  title: {
    default: "MB Multimarcas Infantil | Moda infantil no WhatsApp",
    template: "%s | MB Multimarcas Infantil",
  },
  description:
    "Catálogo online da MB Multimarcas Infantil com roupas infantis, conjuntos, vestidos e peças para bebê. Atendimento direto pelo WhatsApp.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "MB Multimarcas Infantil",
    description:
      "Conheça o catálogo da MB Multimarcas Infantil e chame no WhatsApp para consultar disponibilidade.",
    type: "website",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "MB Multimarcas Infantil — Moda Infantil",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
