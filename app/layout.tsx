import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: {
    template: "%s - Umamusume Cheat Sheet",
    default: "Home - Umamusume Cheat Sheet",
  },
  description:
    "Umamusume Cheat Sheet - Your comprehensive guide for Uma Musume Pretty Derby",
  authors: [{ name: "Quakey" }],
  openGraph: {
    title: {
      template: "%s - Umamusume Cheat Sheet",
      default: "Home - Umamusume Cheat Sheet",
    },
    description:
      "Umamusume Cheat Sheet - Your comprehensive guide for Uma Musume Pretty Derby",
    url: "https://umamusume.wildquaker.com/",
    siteName: "Umamusume Cheat Sheet",
    locale: "en_US",
    type: "article",
    publishedTime: "2025-12-13T12:12:33+08:00",
    modifiedTime: "2026-03-16T19:10:54+08:00",
  },
  twitter: {
    card: "summary",
    title: {
      template: "%s - Umamusume Cheat Sheet",
      default: "Home - Umamusume Cheat Sheet",
    },
    description:
      "Umamusume Cheat Sheet - Your comprehensive guide for Uma Musume Pretty Derby",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-196x196.png", sizes: "196x196", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
    ],
    other: [
      { rel: "msapplication-TileImage", url: "/mstile-144x144.png" },
      { rel: "msapplication-square70x70logo", url: "/mstile-70x70.png" },
      { rel: "msapplication-square150x150logo", url: "/mstile-150x150.png" },
      { rel: "msapplication-wide310x150logo", url: "/mstile-310x150.png" },
      { rel: "msapplication-square310x310logo", url: "/mstile-310x310.png" },
    ],
  },
  applicationName: " ",
  other: {
    "msapplication-TileColor": "#ffffff",
    "article:section": "posts",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
