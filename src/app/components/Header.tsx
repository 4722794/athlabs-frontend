import Image from "next/image";
import React, { useState } from "react";

interface HeaderProps {
  showButton?: boolean;
  joinUSAction?: any;
}

const Header: React.FC<HeaderProps> = ({ showButton = true, joinUSAction }) => {
  const [openmenu, setOpenMenu] = useState(false);

  const mobileMenuOpen = () => {
    document.body.classList.add("overflow-hidden");
    setOpenMenu(true);
  };

  const mobileMenuClose = () => {
    document.body.classList.remove("overflow-hidden");
    setOpenMenu(false);
  };

  return (
    <>
      <header className="bg-[#04080f]   text-white text-left items-center flex fixed w-full top-0 z-30 h-14 md:h-16  lg:h-16 xl:h-16 2xl:h-24 border-b border-gray-800">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-between items-center">
          <a className=" inline-flex h-8 xl:h-8 2xl:h-10 ">
            <Image
              src={"/images/logo.svg"}
              width={230}
              height={72}
              className=" h-full w-auto"
              alt="logo"
            />
          </a>

          {showButton ? (
            <>
              <div
                onClick={mobileMenuOpen}
                className="inline-flex lg:hidden items-center  text-xl w-8 h-8  bg-transparent justify-center  rounded-full border border-gray-300"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className=" hidden lg:inline-flex items-center gap-x-5">
                <a
                  className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
                  onClick={joinUSAction}
                >
                  JOIN US
                </a>
                <a className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer">
                  REQUEST DEMO
                </a>
                <a
                  href="/login"
                  className=" ml-2 bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-9 2xl:h-12 min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer
              
              hover:bg-gradient-to-r from-[#101828] to-[#44366a] hover:text-white
              "
                >
                  GO TO APP
                </a>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </header>

      <div
        className={` absolute h-full w-full z-50 bg-[#04080f] ${
          openmenu ? "" : "hidden"
        }`}
      >
        <div className="bg-[#04080f]  text-white text-left items-center flex w-full top-0 z-30 h-14 md:h-16  lg:h-16 xl:h-16 2xl:h-24 border-b border-gray-800">
          <div className="container mx-auto self-center px-6 md:px-8 flex justify-between items-center">
            <a className=" inline-flex h-8 xl:h-8 2xl:h-10 ">
              <Image
                src={"/images/logo.svg"}
                width={230}
                height={72}
                className=" h-full w-auto"
                alt="logo"
              />
            </a>

            <div
              onClick={mobileMenuClose}
              className="inline-flex items-center  text-xl w-8 h-8  bg-transparent justify-center  rounded-full border border-gray-300"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className=" flex flex-col justify-center  items-center gap-y-5 h-[calc(100vh-70px)]">
          <a
            className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
            onClick={joinUSAction}
          >
            JOIN US
          </a>
          <a className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer">
            REQUEST DEMO
          </a>
          <a
            href="/login"
            className=" ml-2 bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-9 2xl:h-12 min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer
              
              hover:bg-gradient-to-r from-[#101828] to-[#44366a] hover:text-white
              "
          >
            GO TO APP
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
