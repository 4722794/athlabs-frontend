import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-[#171717]  text-white text-left sticky top-0 flex items-center  w-full z-30 h-16  border-b border-white/50">
      <div className="flex justify-between items-center w-full px-6">
        <div className=" inline-flex justify-between">
          <a className=" w-14 h-14 hover:bg-gray-700 inline-flex justify-center items-center rounded-full cursor-pointer">
            <svg
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1829 4.31673C21.028 4.16051 20.8436 4.03652 20.6405 3.95191C20.4374 3.86729 20.2196 3.82373 19.9996 3.82373C19.7796 3.82373 19.5617 3.86729 19.3586 3.95191C19.1555 4.03652 18.9712 4.16051 18.8162 4.31673L3.81624 19.3167C3.66003 19.4717 3.53603 19.656 3.45142 19.8591C3.36681 20.0622 3.32324 20.28 3.32324 20.5001C3.32324 20.7201 3.36681 20.9379 3.45142 21.141C3.53603 21.3441 3.66003 21.5285 3.81624 21.6834C3.97197 21.8379 4.15667 21.9601 4.35973 22.043C4.56279 22.126 4.78023 22.168 4.99957 22.1667H6.66624V33.8334C6.66624 34.7175 7.01743 35.5653 7.64255 36.1904C8.26767 36.8155 9.11552 37.1667 9.99957 37.1667H29.9996C30.8836 37.1667 31.7315 36.8155 32.3566 36.1904C32.9817 35.5653 33.3329 34.7175 33.3329 33.8334V22.1667H34.9996C35.4416 22.1667 35.8655 21.9911 36.1781 21.6786C36.4906 21.366 36.6662 20.9421 36.6662 20.5001C36.6675 20.2807 36.6255 20.0633 36.5425 19.8602C36.4596 19.6572 36.3374 19.4725 36.1829 19.3167L21.1829 4.31673ZM9.99957 33.8334V17.8501L19.9996 7.85006L29.9996 17.8501V33.8334H9.99957Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        <div className=" inline-flex justify-between">
          <a className=" w-14 h-14 hover:bg-gray-700 inline-flex justify-center items-center rounded-full cursor-pointer">
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
          </a>

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
