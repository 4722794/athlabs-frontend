import { NavbarLink } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterProps {
  className?: string;
}
const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-[#04080f]  text-white text-left items-center flex w-full top-auto bottom-0 z-10  border-b border-gray-800 xl:sticky ${className}`}
    >
      <div className="container mx-auto self-center px-6 md:px-8 ">
        <div className="flex flex-wrap lg:flex-nowrap justify-end pt-7 pb-7  md:pb-10 md:pt-10  xl:pb-7 2xl:pb-10 gap-y-10">
          <div className=" w-full md:w-4/12 lg:w-4/12 w- flex justify-center  md:justify-start">
            <a className=" inline-flex h-6 2xl:h-8  ">
              <Image
                src={"/images/newlogo_v4.png"}
                width={160}
                height={25}
                className=" h-full w-auto"
                alt="logo"
              />
            </a>
          </div>

          <div className="w-full md:w-6/12 lg:w-4/12  justify-center flex self-center   ">
            <div className=" inline-flex  gap-x-4 md:gap-x-6 justify-center">
              <Link
                href="/privacyPolicy"
                className=" text-[11px] tracking-[.25em] hover:text-purple-400 text-center"
              >
                PRIVACY POLICY
              </Link>
              <span className=" h-1 bg-white"></span>
              <Link
                href="/termsAndConditions"
                className=" text-[11px] tracking-[.25em] hover:text-purple-400 text-center"
              >
                TERMS & CONDITIONS
              </Link>
            </div>
          </div>

          <div className="w-full md:w-3/12 lg:w-4/12  justify-center  md:justify-end flex self-center   ">
            <div className=" font-extralight text-[11px] tracking-[.25em] ">
              © {currentYear} ATHLABS
            </div>
          </div>

          <div className="w-full lg:w-6/12  justify-between hidden">
            <div className=" inline-flex w-auto flex-col">
              <div className=" font-extralight text-[11px] tracking-[.25em] ">
                NAVIGATION
              </div>
              <div className=" mt-5">
                <a className="font-light text-[11px] tracking-[.25em] ">BLOG</a>
              </div>
            </div>
            <div className=" inline-flex w-auto flex-col">
              <div className=" font-extralight text-[11px] tracking-[.25em] ">
                SOCIAL
              </div>
              <div className=" mt-5">
                <a className="font-light text-[11px] tracking-[.25em] ">
                  TWITTER
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="  flex justify-between flex-wrap md:flex-nowrap py-5 xl:py-6 2xl:py-8 border-t border-white/20 gap-y-5 hidden">
          <div className=" text-[11px] tracking-[.25em] md:w-6/12">
            © {currentYear} ATHLABS
          </div>
          <div className=" inline-flex  gap-x-4 md:gap-x-6 md:w-6/12 justify-end">
            <a className=" text-[11px] tracking-[.25em] text-center">PRIVACY POLICY</a>
            <a className=" text-[11px] tracking-[.25em] text-center">TERMS & CONDITIONS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
