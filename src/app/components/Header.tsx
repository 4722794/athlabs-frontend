import Image from "next/image";
import React from "react";

interface HeaderProps {
  showButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showButton = true }) => {
  return (
    <header className="bg-[#04080f]  text-white text-left items-center flex fixed w-full top-0 z-30 h-14 md:h-20  lg:h-24 border-b border-gray-800">
      <div className="container mx-auto self-center px-6 md:px-8 flex justify-between items-center">
        <a className=" inline-flex h-10  md:h-auto">
          <Image
            src={"/images/logo.svg"}
            width={230}
            height={72}
            className=" h-full w-auto"
            alt="logo"
          />
        </a>

        {showButton ? (
          <div className=" hidden lg:inline-flex items-center">
            <a className="py-2 px-3  text-sm  font-semibold  text-white cursor-pointer">
              JOIN US
            </a>
            <a className="py-2 px-3  text-sm  font-semibold  text-white cursor-pointer">
              REQUEST DEMO
            </a>
            <a
              href="/home"
              className=" ml-2 bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-12 min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
            >
              GO TO APP
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
