import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkLogin } from "../services/apiUtils";
import { Dropdown } from "flowbite-react";
import { useVideoContext } from "../services/VideoContext";

interface HeaderProps {
  showButton?: boolean;
  joinUSAction?: any;
  requestAction?: any;
}

const Header: React.FC<HeaderProps> = ({
  showButton = true,
  joinUSAction,
  requestAction,
}) => {
  const [openmenu, setOpenMenu] = useState(false);
  const [showMenu, setMenu] = useState(false);
  const router = useRouter();
  const { setActiveVideoData, setOtherData, otherData } = useVideoContext();

  const mobileMenuOpen = () => {
    document.body.classList.add("overflow-hidden");
    setOpenMenu(true);
  };
  const handleRequestDemo = () => {
    setOtherData({ ...otherData, requestDemoShow: true });
  };

  const mobileMenuClose = () => {
    document.body.classList.remove("overflow-hidden");
    setOpenMenu(false);
  };

  const goForLogin = (e: any) => {
    e.preventDefault();
    if (checkLogin()) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  const goForSignUp = (e: any) => {
    e.preventDefault();
    if (checkLogin()) {
      router.push("/home");
    } else {
      router.push("/signup");
    }
  };

  const token = localStorage.getItem("athlabsAuthToken");

  useEffect(() => {
    if (token) {
      setMenu(true);
    }
  }, []);

  return (
    <>
      <header className="bg-[#04080f]   text-white text-left items-center flex fixed w-full top-0 z-30 h-14 md:h-16  lg:h-16 xl:h-16 2xl:h-24 border-b border-gray-800">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-between items-center">
          <a href="/" className=" inline-flex h-8 xl:h-8 2xl:h-10 ">
            <Image
              src={"/images/logo2.png"}
              width={230}
              height={72}
              className=" h-full w-auto"
              alt="logo"
            />
          </a>

          {showButton ? (
            <>
              <div
                className="inline-flex lg:hidden 
              "
              >
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  className=" mt-1 bg-[#1a212f]  border-[#344054]  py-0 "
                  renderTrigger={() => (
                    <div className="inline-flex items-center  text-xl w-8 h-8  bg-transparent justify-center  rounded-full border border-gray-300">
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
                          fillRule="evenodd"
                          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                >
                  <Dropdown.Item onClick={joinUSAction} className="text-white">
                    JOIN US
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    onClick={handleRequestDemo}
                    className="text-white "
                  >
                    REQUEST DEMO
                  </Dropdown.Item> */}

                  {showMenu && (
                    <a
                      className="flex items-center justify-start py-2 px-4 text-sm cursor-pointer w-ful hover:bg-gray-600 focus:outline-none hover:text-white focus:bg-gray-600 focus:text-white text-white"
                      href="/home"
                    >
                      DASHBOARD
                    </a>
                  )}

                  {!showMenu && (
                    <>
                      {" "}
                      <a
                        className="flex items-center justify-start py-2 px-4 text-sm cursor-pointer w-ful hover:bg-gray-600 focus:outline-none hover:text-white focus:bg-gray-600 focus:text-white text-white"
                        onClick={(e) => goForLogin(e)}
                        href="/"
                      >
                        SIGN IN
                      </a>
                      <a
                        className="flex items-center justify-start py-2 px-4 text-sm cursor-pointer w-ful hover:bg-gray-600 focus:outline-none hover:text-white focus:bg-gray-600 focus:text-white text-white"
                        onClick={(e) => goForSignUp(e)}
                        href="/"
                      >
                        SIGN UP
                      </a>
                    </>
                  )}
                </Dropdown>
              </div>

              {/* <div
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
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                
              </div> */}
              <div className=" hidden lg:inline-flex items-center gap-x-5">
                <a
                  className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
                  onClick={joinUSAction}
                >
                  JOIN US
                </a>
                {/* <a
                  onClick={handleRequestDemo}
                  className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
                >
                  REQUEST DEMO
                </a> */}
                {showMenu && (
                  <a
                    href="/home"
                    className=" ml-2 bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-9 2xl:h-12 min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer
        
        hover:bg-gradient-to-r from-[#101828] to-[#44366a] hover:text-white
        "
                  >
                    Dashboard
                  </a>
                )}
                {!showMenu && (
                  <>
                    <a
                      onClick={(e) => goForLogin(e)}
                      className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
                    >
                      SIGN IN
                    </a>

                    <a
                      onClick={(e) => goForSignUp(e)}
                      href="/"
                      className=" ml-2 bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-9 2xl:h-12 min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer
              
              hover:bg-gradient-to-r from-[#101828] to-[#44366a] hover:text-white
              "
                    >
                      SIGN UP
                    </a>
                  </>
                )}
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
                src={"/images/logo2.png"}
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
          {/* <a className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer">
            REQUEST DEMO
          </a> */}
          {showMenu && (
            <a
              href="/login"
              className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
            >
              DASHBOARD
            </a>
          )}
          {!showMenu && (
            <>
              <a
                href="/login"
                className="ml-2 bg-transparent  py-2 px-3  text-sm  font-semibold hover:text-purple-400  text-white inline-flex h-9 2xl:h-12  justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer"
              >
                SIGN IN
              </a>

              <a
                href="/signup"
                className=" ml-2 bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-9 2xl:h-12 min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40 cursor-pointer
              
              hover:bg-gradient-to-r from-[#101828] to-[#44366a] hover:text-white
              "
              >
                SIGN UP
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
