import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SignUp from "../components/SignUp";
import { useState } from "react";
import RequestDemo from "../components/RequestDemo";

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
  const [requestmodalOpen, requestsetOpenModal] = useState(false);

  const joinModalHandler = () => {
    setOpenModal(!modalOpen);
  };

  const requestModalHandler = () => {
    requestsetOpenModal(!requestmodalOpen);
  };

  return (
    <>
      <Header showButton={showButton} joinUSAction={joinModalHandler} requestAction={requestModalHandler} />
      {children}
      <SignUp popupAction={modalOpen} onCloseModal={joinModalHandler} />
      <RequestDemo popupAction={requestmodalOpen} onCloseModal={requestModalHandler} />
      <Footer className={footerClass} />
    </>
  );
};

export default LandingLayout;
