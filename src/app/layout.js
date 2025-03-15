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
  title: "Ile dni do",
  description: "Simple timers you can store on your own browser",
  openGraph: {
    title: "Ile dni do",
    description: "Simple timers you can store on your own browser",
    images: [{
      url: "https://xfaang-assets.s3.eu-west-3.amazonaws.com/seo/timers.jpg",
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ile dni do",
    description: "Simple timers you can store on your own browser",
    images: ["https://xfaang-assets.s3.eu-west-3.amazonaws.com/seo/timers.jpg"],
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
