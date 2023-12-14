// Features.jsx

import React from "react";
import HealthApp from "../components/HealthApp";
// import "@/app/globals.css";

const Features = () => {
  return (
    <div className="relative z-20">
      <section className="  sticky top-0">
        <div className="py-0 bg-[#04080f] h-screen items-center">
          <div className="container mx-auto  px-6 md:px-8 flex  items-center  h-full">
            <div className=" w-full md:w-6/12">
              <h2 className=" text-5xl lg:text-8xl font-bold mb-6 text-[#98a2b3] leading-[4rem] lg:leading-[7.5rem]">
                Put your health on autopilot.
              </h2>
              <div className=" text-2xl text-white/80 my-10">
                Your personalized health OS.
              </div>

              <div>
                <div className="w-full lg:w-10/12 pt-5">
                  <form className="flex items-center flex-1 justify-start mt-30 relative">
                    <div className="w-full relative text-left">
                      <input
                        type="text"
                        placeholder=" > enter your email"
                        className="box-border placeholder:text-white/50 text-white bg-[#1a212f] border-1 border-[#344054]  p-2 pl-5 min-h-[75px]  w-full  outline-2 outline-gray-800 "
                      />
                    </div>

                    <input
                      type="submit"
                      value="Get access"
                      data-wait="..."
                      className="w-[200px] cursor-pointer  text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-gradient-to-r from-[#101828] to-[#44366a] min-h-[60px] absolute right-2 top-2 overflow-visible"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#101828] pt-24 pb-0 relative">
        <div className="container mx-auto  px-6 md:px-8">
          <div className=" text-2xl md:text-3xl text-white text-center leading-10 font-extralight ">
            Welcome to your personalized health system.
          </div>
          <div className=" text-2xl md:text-3xl text-white text-center leading-10 font-extralight pt-10 ">
            Harness the power of your data to build your optimal health routine.
          </div>
        </div>
      </section>

      <section className="s-hp-slides relative bg-[#101828] z-10">
        <HealthApp />
      </section>

      <section className="relative z-10  bg-[#e4e7ec] py-20 lg:py-20 min-h-[200px]">
        <div className="container mx-auto  px-6 md:px-8">
          <div className="text-3xl lg:text-5xl mb-5 lg:leading-[58px] text-center ">
            “I love how I can easily create training programs <br />
            for my athletes and visualize key performance metrics”
          </div>

          <div className="w-full lg:w-6/12 mx-auto pt-5">
            <form className="flex items-center flex-1 justify-start mt-30 relative">
              <div className="w-full relative text-left">
                <input
                  type="text"
                  className="box-border shadow-none text-[#212121] bg-[#dadada] border-1 border-[#344054]  p-2 pl-5 min-h-[75px]  w-full  outline-2 outline-gray-800"
                />
              </div>

              <input
                type="submit"
                value="Get access"
                data-wait="..."
                className="w-[200px] cursor-pointer text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-[#a11043] min-h-[60px] absolute right-2 top-2 overflow-visible"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
