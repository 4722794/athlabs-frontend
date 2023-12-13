import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#04080f]  text-white text-left items-center flex w-full sticky top-auto bottom-0 z-10  border-b border-gray-800">
      <div className="container mx-auto self-center px-6 md:px-8 ">
        <div className="flex justify-end py-20">
          <div className="w-6/12 flex justify-between">
            <a className=" inline-flex h-12 md:h-auto ">
              <Image
                src={"/images/logo.svg"}
                width={230}
                height={72}
                className=" h-full w-auto"
                alt="logo"
              />
            </a>
          </div>

          <div className="w-6/12 flex justify-between">
            <div className=" inline-flex w-auto flex-col">
              <div className=" font-extralight text-sm tracking-wider ">
                NAVIGATION
              </div>
              <div className=" mt-5">
                <a className="font-light text-sm tracking-wider ">BLOG</a>
              </div>
            </div>
            <div className=" inline-flex w-auto flex-col">
              <div className=" font-extralight text-sm tracking-wider ">
                SOCIAL
              </div>
              <div className=" mt-5">
                <a className="font-light text-sm tracking-wider ">TWITTER</a>
              </div>
            </div>
          </div>
        </div>

        <div className="  flex justify-between py-8 border-t border-white/20">
          <div className="tracking-wider ">© 2023 BASIS</div>
          <div className=" inline-flex  gap-x-6">
            <a className="tracking-wider ">PRIVACY POLICY</a>
            <a className="tracking-wider ">TERMS & CONDITIONS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
