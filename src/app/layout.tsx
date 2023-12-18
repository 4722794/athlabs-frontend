"use client";
import React, { useEffect } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { useRouter } from 'next/navigation'
import { checkLogin } from "./services/apiUtils";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "Athlabs",
  description: "Athlabs | Performance coach assistant",
}; */

export default function AppLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter()

  useEffect(() => {
    if(!checkLogin()){
      router.push('/login')
    }
  }, []);
  return (
    <html lang="en" className=" font-sans">
      <body>{children}</body>
    </html>
  );
}
