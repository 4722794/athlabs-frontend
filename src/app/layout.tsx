import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import Main from "./layout/Main";

export const metadata: Metadata = {
  title: "Athlabs - AI Performance Coach",
  description: "Discover Athlabs, your personal AI coach for fitness training. Get real-time feedback on your workout form, tailored improvement suggestions, and insights to enhance your performance and safety.",
  keywords: "fitness, yoga, AI, artificial intelligence, strength, conditioning, gym, online gym, workout, AI fitness coach, personal training app, fitness technology, exercise analytics, real-time workout feedback, health improvement, sports training assistant, fitness app, physical therapy, exercise form correction, football, cricket, tennis, basketball, weight, weightlifting, weight training, strength training, exercise, form correction, right way to perform a deadlift",
  robots: "https://www.athlabs.co",
  openGraph: {
    title: 'Athlabs - AI Performance Coach',
    description: 'Get personalized feedback on your exercise and yoga form with Athlabs.',
    images: 'https://www.athlabs.co/images/logo2.png',
    type: 'website',
    siteName: 'Athlabs'
  }
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className=" font-sans">
      <body>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
