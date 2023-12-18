import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SignUp from "../components/SignUp";

interface LandingLayoutProps {
  showButton?: boolean;
  footerClass?: string;
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({
  showButton = true,
  footerClass,
  children,
}) => {
  return (
    <>
      <Header showButton={showButton} />
      {children}
      <SignUp />
      <Footer className={footerClass} />
    </>
  );
};

export default LandingLayout;
