import Image from "next/image";
import React from "react";

interface FooterProps {
  className?: string;
}
const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={`bg-[#04080f]  text-white text-left items-center flex w-full top-auto bottom-0 z-10  border-b border-gray-800 sticky ${className}`}
    >
      <div className="container mx-auto self-center px-6 md:px-8 ">
        <div className="flex flex-wrap lg:flex-nowrap justify-end py-14 md:py-20 gap-y-10">
          <div className="w-full lg:w-6/12 flex justify-between">
            <a className=" inline-flex h-10 md:h-auto ">
              <Image
                src={"/images/logo.svg"}
                width={230}
                height={72}
                className=" h-full w-auto"
                alt="logo"
              />
            </a>
          </div>

          <div className="w-full lg:w-6/12 flex justify-between">
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

        <div className="  flex justify-between flex-wrap md:flex-nowrap py-8 border-t border-white/20 gap-y-5">
          <div className=" text-[11px] tracking-[.25em] md:w-6/12">
            © 2023 BASIS
          </div>
          <div className=" inline-flex  gap-x-4 md:gap-x-6 md:w-6/12 justify-end">
            <a className=" text-[11px] tracking-[.25em] ">PRIVACY POLICY</a>
            <a className=" text-[11px] tracking-[.25em] ">TERMS & CONDITIONS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
