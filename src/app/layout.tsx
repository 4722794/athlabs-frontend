"use client";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import { VideoProvider } from "./services/VideoContext";

/* export const metadata: Metadata = {
  title: "Athlabs",
  description: "Athlabs | Performance coach assistant",
}; */

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="en" className=" font-sans">
     <VideoProvider> <body>{children}</body></VideoProvider>
    </html>
  );
}
