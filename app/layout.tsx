import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mbmultimarcasinfantil.com.br"),
  title: {
    default: "MB Multimarcas Infantil | Moda infantil no WhatsApp",
    template: "%s | MB Multimarcas Infantil",
  },
  description:
    "Catalogo online da MB Multimarcas Infantil com roupas infantis, conjuntos, vestidos e pecas para bebe. Atendimento direto pelo WhatsApp.",
  openGraph: {
    title: "MB Multimarcas Infantil",
    description:
      "Conheca o catalogo da MB Multimarcas Infantil e chame no WhatsApp para consultar disponibilidade.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Moda infantil MB Multimarcas Infantil",
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
      <body>{children}</body>
    </html>
  );
}
