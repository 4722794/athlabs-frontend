"use client";
import React from "react";
import HealthApp from "./components/HealthApp";
import LandingLayout from "./layout/LandingLayout";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

const AppPage = () => {
  return (
    <LandingLayout>
      <div className="relative z-20">
        <section className="  md:sticky top-0  ">
          <div className="py-0 bg-[#04080f] md:h-screen items-center pb-10 md:pb-0">
            <div className="container mx-auto  px-6 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between pt-24  h-full gap-y-12">
              <div className=" w-full md:w-8/12">
                <h2 className=" text-3xl  md:text-5xl  xl:text-6xl  2xl:text-8xl font-bold mb-6 text-[#98a2b3] leading-10 md:leading-[4rem] xl:leading-[6.5rem] 2xl:leading-[7.5rem] text-center md:text-left">
                  Precision feedback Peak performance
                </h2>
                <div className=" text-2xl md:text-4xl text-white/80 my-5 md:my-10 text-center md:text-left">
                  Your digital coach for injury-free training.
                </div>

                <div>
                  <div className="w-full lg:w-10/12 pt-5">
                    <form className="flex items-center flex-1 justify-start mt-30 relative">
                      <div className="w-full relative text-left">
                        <input
                          type="text"
                          placeholder=" > enter your email"
                          className="box-border placeholder:text-white/50 text-white bg-[#1a212f] border-1 border-[#344054] p-1 md:p-2 pl-5 h-12 md:min-h-[75px]  w-full  outline-2 outline-gray-800 "
                        />
                      </div>

                      <input
                        type="submit"
                        value="Get access"
                        data-wait="..."
                        className=" px-3 md:px-0 md:w-[200px] cursor-pointer  text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-gradient-to-r from-[#101828] to-[#44366a] h-10 md:min-h-[60px] absolute right-1 md:right-2 top-1 md:top-2 overflow-visible"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className=" w-[250px] md:w-[350px] relative mx-auto md:mr-0 ">
                <Image
                  src="/images/heroMobile.png"
                  width={304}
                  height={614}
                  className=" w-full"
                  alt=""
                />

                <div className=" absolute bottom-5 left-0 w-full px-6 md:px-10 !py-0 h-[75px] md:h-[110px]">
                  <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "We produce food for Mice",
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      "We produce food for Hamsters",
                      1000,
                      "We produce food for Guinea Pigs",
                      1000,
                      "We produce food for Chinchillas",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className=" text-[12px] md:text-sm"
                    repeat={Infinity}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#101828] pt-14 md:pt-24 pb-0 relative">
          <div className="container mx-auto  px-6 md:px-8">
            <div className=" text-xl md:text-2xl lg:text-3xl text-white text-center leading-7 xl:leading-10 font-extralight ">
              Welcome to your own digital performance coach
            </div>
            <div className=" text-xl md:text-2xl lg:text-3xl text-white text-center leading-7 xl:leading-10 font-extralight pt-5 md:pt-10 ">
              Harness the power of AI to train with confidence and without
              injury
            </div>
          </div>
        </section>

        <section className="s-hp-slides relative bg-[#101828] z-10">
          <HealthApp />
        </section>

        <section className="relative z-10  bg-[#e4e7ec] py-14 md:py-20 lg:py-20 md:min-h-[200px]">
          <div className="container mx-auto  px-6 md:px-8">
            <div className=" text-xl md:text-3xl lg:text-5xl mb-5 lg:leading-[58px] text-center ">
              “I love how I can easily create training programs <br />
              for my athletes and visualize key performance metrics”
            </div>

            <div className="w-full lg:w-6/12 mx-auto pt-5">
              <form className="flex items-center flex-1 justify-start mt-30 relative">
                <div className="w-full relative text-left">
                  <input
                    type="text"
                    className="box-border shadow-none text-[#212121] bg-[#dadada] border-1 border-[#344054]  p-1 md:p-2 pl-5 h-12 md:min-h-[75px]  w-full  outline-2 outline-gray-800"
                  />
                </div>

                <input
                  type="submit"
                  value="Get access"
                  data-wait="..."
                  className="px-3 md:px-0 md:w-[200px] cursor-pointer text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-[#a11043] h-10 md:min-h-[60px] absolute right-1 md:right-2 top-1 md:top-2 overflow-visible"
                />
              </form>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
};

export default AppPage;
