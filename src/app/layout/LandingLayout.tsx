import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SignUp from "../components/SignUp";
import { useState } from "react";

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
  const [modalOpen, setOpenModal] = useState(false);

  const joinModalHandler = () => {
    setOpenModal(!modalOpen);
  };

  return (
    <>
      <Header showButton={showButton} joinUSAction={joinModalHandler} />
      {children}
      <SignUp popupAction={modalOpen} onCloseModal={joinModalHandler} />
      <Footer className={footerClass} />
    </>
  );
};

export default LandingLayout;
