import packageJson from "@/package.json";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open DMS location browser",
  description: "This app lets you browse location data based on OSM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <header className="bg-emerald-500 dark:bg-emerald-900 text-emerald-50 flex flex-row justify-between items-baseline p-4">
          <div className="text-3xl">Open DMS location browser</div>
          <div>Version v{packageJson.version}</div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
