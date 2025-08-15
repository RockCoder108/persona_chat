import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "AI Persona Chat",
  description: "Chat with AI personas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center p-4">
        <header className="text-2xl font-bold mb-4">AI Persona Chat</header>
        <main className="w-full max-w-2xl">{children}</main>
      </body>
    </html>
  );
}

