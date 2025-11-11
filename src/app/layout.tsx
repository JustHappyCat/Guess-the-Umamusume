import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer/footer"
import { ThemeProvider } from "../contexts/ThemeContext"
import { GameProvider } from "../contexts/GameContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guess the Umamusume",
  description: "Test your knowledge of Umamusume characters in this fun guessing game",
  keywords: ["Umamusume", "racing", "game", "quiz", "characters"],
  authors: [{ name: "Umamusume Game Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefefe" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Test your knowledge of Umamusume characters" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)"
        }}
      >
        <ThemeProvider>
          <GameProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow">
                {children}
              </main>
              <footer className="border-t border-[var(--card-border)] bg-[var(--background-secondary)]">
                <Footer />
              </footer>
            </div>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
