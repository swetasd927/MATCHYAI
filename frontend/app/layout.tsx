import "./globals.css";
import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { AuthProvider } from "../lib/auth";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["500", "600"],
});

export const metadata = {
  title: "MatchyAI",
  description: "AI-powered resume matching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${jakarta.variable} ${plexMono.variable} min-h-screen`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AuthProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 sm:px-6">
              <PageTransition>{children}</PageTransition>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
