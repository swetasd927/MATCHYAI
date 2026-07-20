import "./globals.css";
import { AuthProvider } from "../lib/auth";
import Navbar from "../components/Navbar";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "MatchyAI — AI-Powered Resume Matching",
  description: "Upload your resume once. Let AI find your perfect role.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans antialiased bg-[#05050a] text-slate-100 selection:bg-indigo-500/30 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="mesh-bg min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}