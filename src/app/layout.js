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
  metadataBase: new URL('https://ilednido.tuhaj.pl'),
  title: "Ile dni do",
  description: "Ile dni do konca kadencji Karola Nawrockiego?",
  openGraph: {
    title: "Ile dni do",
    description: "Ile dni do konca kadencji Karola Nawrockiego?",
    images: [{
      url: "/og-image.svg",
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ile dni do",
    description: "Ile dni do konca kadencji Karola Nawrockiego?",
    images: ["/og-image.svg"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
