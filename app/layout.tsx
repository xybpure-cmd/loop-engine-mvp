import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/top-nav";
import { AppStateProvider } from "@/components/app-state";

export const metadata: Metadata = {
  title: "Loop Engine MVP",
  description: "Focused loop workbench MVP skeleton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <TopNav />
          <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </AppStateProvider>
      </body>
    </html>
  );
}
