import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SignUp from "../components/SignUp";
import { useState } from "react";
import RequestDemo from "../components/RequestDemo";
import { useVideoContext } from "../services/VideoContext";

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
  const { setActiveVideoData, setOtherData, otherData } = useVideoContext();

  const joinModalHandler = () => {
    setOpenModal(!modalOpen);
  };

  const requestModalHandler = () => {
    //requestsetOpenModal(!requestmodalOpen);

    setOtherData({ ...otherData, requestDemoShow: false });
  };

  return (
    <>
      <Header
        showButton={showButton}
        joinUSAction={joinModalHandler}
        requestAction={""}
      />
      {children}
      <SignUp popupAction={modalOpen} onCloseModal={joinModalHandler} />
      <RequestDemo
        popupAction={otherData.requestDemoShow}
        onCloseModal={requestModalHandler}
      />
      <Footer className={footerClass} />
    </>
  );
};

export default LandingLayout;
