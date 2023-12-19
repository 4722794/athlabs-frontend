import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("athlabsAuthToken");
    const tokenAfterRemoval = localStorage.getItem("athlabsAuthToken");
    if (tokenAfterRemoval === null) {
      router.push("/login");
    }
  };
  return (
    <header className="bg-[#171717]  text-white text-left sticky top-0 flex items-center  w-full z-30 py-3  ">
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
          <a
            className=" w-10 h-10 hover:bg-gray-700 inline-flex justify-center items-center rounded-full cursor-pointer text-3xl "
            onClick={logOut}
            title="logout"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"></path>
            </svg>
          </a>

          {/* <a className=" w-10 h-10 hover:bg-gray-700 inline-flex justify-center items-center rounded-full cursor-pointer">
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
          </a> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
