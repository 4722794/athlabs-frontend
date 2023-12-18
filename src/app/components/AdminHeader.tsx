import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-[#171717]  text-white text-left sticky top-0 flex items-center  w-full z-30 h-16  border-b border-white/50">
      <div className="flex justify-between items-center w-full px-6">
        <div className=" inline-flex justify-between">
          <a className=" inline-flex h-8 xl:h-8 2xl:h-10  items-start">
            <Image
              src={"/images/logo.svg"}
              width={230}
              height={72}
              className=" h-full w-auto"
              alt="logo"
            />
          </a>
        </div>

        <div className=" inline-flex justify-between">
          {/* <a className=" w-14 h-14 hover:bg-gray-700 inline-flex justify-center items-center rounded-full cursor-pointer">
            <svg
              width="30"
              height="37"
              viewBox="0 0 30 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 26.9999H26.6667V15.3856C26.6667 8.91335 21.4433 3.66659 15 3.66659C8.55668 3.66659 3.33333 8.91335 3.33333 15.3856V26.9999ZM15 0.333252C23.2843 0.333252 30 7.07238 30 15.3856V30.3333H0V15.3856C0 7.07238 6.71573 0.333252 15 0.333252ZM10.8333 31.9999H19.1667C19.1667 34.3011 17.3012 36.1666 15 36.1666C12.6988 36.1666 10.8333 34.3011 10.8333 31.9999Z"
                fill="white"
              />
            </svg>
          </a> */}

          <a className=" w-14 h-14 hover:bg-gray-700 inline-flex justify-center items-center rounded-full cursor-pointer">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.3337 35V31.6667C33.3337 29.8986 32.6313 28.2029 31.381 26.9526C30.1308 25.7024 28.4351 25 26.667 25H13.3337C11.5655 25 9.86986 25.7024 8.61961 26.9526C7.36937 28.2029 6.66699 29.8986 6.66699 31.6667V35"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.9997 18.3333C23.6816 18.3333 26.6663 15.3486 26.6663 11.6667C26.6663 7.98477 23.6816 5 19.9997 5C16.3178 5 13.333 7.98477 13.333 11.6667C13.333 15.3486 16.3178 18.3333 19.9997 18.3333Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
