"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/AdminHeader";
import { useRouter } from "next/navigation";
import { checkLogin } from "../services/apiUtils";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const [open, setSidebarOpen] = useState(true);
  const router = useRouter();
  const toggleSidebar = () => {
    setSidebarOpen(!open);
  };

  useEffect(() => {
    if (!checkLogin()) {
      router.push("/login");
    } else {
      router.push("/home");
    }

    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 1024;
      setSidebarOpen(!isSmallScreen);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <Sidebar modalOpen={open} toggleSidebar={toggleSidebar} />
      <div
        // onClick={toggleSidebar}
        className={` lg:hidden bg-black/50 absolute w-full h-full top-0 left-0 z-10 ${
          open ? " translate-x-[260px] " : "translate-x-[0px] hidden "
        }transform  -translate-y-2/2 rotate-0 translate-z-0`}
      >
        <button className=" grow-0 toggle-button  text-white w-10 border border-white inline-flex justify-center items-center m-2.5 h-[42px] hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 4.5L4.5 15.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 4.5L15.5 15.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden bg-[#171717]">
        <main className="relative h-full w-full flex-1 overflow-auto transition-width">
          <div
            className={`fixed left-0 top-0 z-40 hover:bg-[#373D51] cursor-pointer text-white  ${
              open
                ? " translate-x-[260px] hidden "
                : "translate-x-[0px]  inline-flex  "
            }transform    rotate-180 translate-z-0 h-16 w-6  justify-center items-center  `}
            onClick={toggleSidebar}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.895812 6.37194C0.738708 6.55343 0.660156 6.76278 0.660156 7C0.660156 7.23722 0.738708 7.44657 0.895812 7.62806L5.90581 12.8781C6.079 13.0427 6.27878 13.125 6.50516 13.125C6.73153 13.125 6.93132 13.0427 7.1045 12.8781C7.2616 12.6966 7.34016 12.4872 7.34016 12.25C7.34016 12.0128 7.2616 11.8034 7.1045 11.6219L2.66972 7L7.1045 2.37806C7.2616 2.19657 7.34016 1.98722 7.34016 1.75C7.34016 1.51278 7.2616 1.30343 7.1045 1.12194C6.93132 0.957315 6.73153 0.875 6.50516 0.875C6.27878 0.875 6.079 0.957315 5.90581 1.12194L0.895812 6.37194Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex h-full flex-col">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
