import "./globals.css";
import { AuthProvider } from "../lib/auth";
import Navbar from "../components/Navbar";

export const metadata = { title: "MatchyAI", description: "AI-powered resume matching" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen text-slate-100 selection:bg-indigo-500/30">
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}