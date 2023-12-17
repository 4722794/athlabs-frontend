"use client";
import React, { useState } from "react";
import HealthApp from "./components/HealthApp";
import LandingLayout from "./layout/LandingLayout";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import Slider from "react-slick";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const AppPage = () => {
  const [sliderItems, setSliderItems] = useState([
    {
      id: 1,
      type: "image",
      src: "/images/website_final/gif_new/squat_cropped.gif",
      text: "Push hips back…",
    },
    {
      id: 2,
      type: "image",
      src: "/images/website_final/gif_new/cropped_jump.gif",
      text: "Land softly,extend hips at top...",
    },
    {
      id: 3,
      type: "image",
      src: "/images/website_final/gif_new/cropped_deadlift.gif",
      text: "Back straight, Engage your Glutes…",
    },

    // Add more items as needed
  ]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <LandingLayout>
      <div className="relative z-20">
        <section className="  lg:sticky top-0  ">
          <div className="py-0 bg-[#04080f]   min-h-[550px] items-center 2xl:pt-5 pb-10 md:pb-0">
            <div className="container mx-auto  px-6 md:px-8 flex flex-wrap lg:flex-nowrap items-center justify-between pt-20 2xl:pt-24  pb-20 h-full gap-y-12">
              <div className=" w-full lg:w-8/12">
                <h2 className=" text-3xl  md:text-5xl  xl:text-6xl  2xl:text-8xl font-bold mb-6 text-[#98a2b3] leading-10 md:leading-[4rem] xl:leading-[5rem] 2xl:leading-[7.5rem] text-center md:text-left">
                  <div>Precision feedback</div>
                  Peak performance
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
                          className="box-border placeholder:text-white/50 text-white bg-[#1a212f] border-1 border-[#344054] pl-5 md:p-2 md:pl-5 h-12 xl:h-14 2xl:h-[75px]  w-full  outline-2 outline-gray-800 "
                        />
                      </div>

                      <input
                        type="submit"
                        value="Get access"
                        data-wait="..."
                        className=" px-3 md:px-0 md:w-[200px] cursor-pointer  text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-gradient-to-r from-[#101828] to-[#44366a] h-10 xl:h-12 2xl:h-[60px] absolute right-1 2xl:right-2 top-1 2xl:top-2 overflow-visible"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="   w-[226px] sm:w-[326px] md:w-[326px] lg:w-4/12 2xl:w-4/12  flex justify-center lg:justify-end mx-auto lg:mr-0">
                <div className="relative w-full   lg:w-10/12 xl:w-7/12 2xl:w-8/12 ">
                  {/* <div className=" w-[calc(100%-8px)] h-full absolute bg-white  rounded-[50px] z-0 left-1"></div> */}
                  <Image
                    src="/images/iphone-x-png-29483.png"
                    width={304}
                    height={614}
                    className=" w-full"
                    alt=""
                  />

                  <div className=" absolute z-20 top-3 left-1/2 transform -translate-x-1/2">
                    <Image
                      src="/images/top.png"
                      width={120}
                      height={22}
                      className=" "
                      alt=""
                    />
                  </div>

                  <div className="absolute mySlider top-1/2 transform -translate-y-1/2 h-[calc(100%-24px)] md:h-[calc(100%-32px)]  left-1/2  -translate-x-1/2 w-[calc(100%-26px)] md:w-[calc(100%-34px)]  overflow-hidden">
                    <Slider
                      className="  h-full rounded-[22px] sm:rounded-[30px] md:rounded-[30px]  lg:rounded-[20px]  xl:rounded-[28px] 2xl:rounded-[30px] overflow-hidden"
                      {...sliderSettings}
                    >
                      {sliderItems.map((item, index) => (
                        <div key={item.id} className="relative h-full ">
                          {item.type === "image" && (
                            <>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full">
                                <Image
                                  src={item.src}
                                  width={800}
                                  height={1500}
                                  alt=""
                                />
                              </div>

                              <div className="absolute bottom-[22px] left-1/2 transform -translate-x-1/2 w-[calc(100%-30px)] rounded-b-[0px] px-3 md:px-3 !py-3 h-auto bg-black/50 flex">
                                <div>
                                  <TypeAnimation
                                    sequence={[item.text, 3000]}
                                    wrapper="span"
                                    speed={50}
                                    className="text-[16px] md:text-xl relative z-10 text-white"
                                    repeat={Infinity}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          {/* Add more conditions for other item types if needed */}
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#101828] pt-14 md:pt-24 pb-0 relative">
          <div className="container mx-auto  px-6 md:px-8">
            <div className=" text-xl md:text-2xl lg:text-3xl 2xl:text-3xl text-white text-center leading-7 xl:leading-10 font-extralight ">
              Welcome to your own digital performance coach
            </div>
            <div className=" text-xl md:text-2xl lg:text-3xl 2xl:text-3xl text-white text-center leading-7 xl:leading-10 font-extralight pt-5 md:pt-5  xl:pt-5 2xl:pt-10  ">
              Harness the power of AI to train with confidence and without
              injury
            </div>
          </div>
        </section>

        <section className="s-hp-slides relative bg-[#101828] z-10">
          <HealthApp />
        </section>

        <section className="relative z-10  bg-[#9aa2b1] py-14 md:py-20 lg:py-20 md:min-h-[200px] ">
          <div className="container mx-auto  px-6 md:px-8 flex  justify-center flex-wrap lg:flex-wrap   gap-y-10">
            <div className=" w-full lg:w-7/12">
              <div className=" text-xl md:text-2xl lg:text-3xl mb-5  text-center text-gray-900  tracking-wider ">
                Sign up now to join our exclusive beta program
              </div>

              <div className="w-full lg:w-12/12 mx-auto pt-5">
                <form className="flex items-center flex-1 justify-start mt-30 relative">
                  <div className="w-full relative text-left">
                    <input
                      type="text"
                      className="box-border shadow-none text-[#212121] bg-[#dadada] border-1 border-[#344054]  p-1 md:p-2 pl-5 h-12 xl:h-14 2xl:h-[75px]  w-full  outline-2 outline-gray-800"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Get access"
                    data-wait="..."
                    className="px-3 md:px-0 md:w-[200px] cursor-pointer text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-[#a11043] h-10 xl:h-12 2xl:min-h-[60px] absolute right-1 xl:right-1 2xl:right-2 top-1 xl:top-1 2xl:top-2 overflow-visible"
                  />
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10  bg-[#E4E7EC] py-14 md:py-20 lg:py-20 md:min-h-[200px] border-b border-gray-800">
          <div className="container mx-auto  px-6 md:px-8 flex  justify-center flex-wrap lg:flex-wrap   gap-y-10">
            <div className=" w-full lg:w-6/12">
              <Slider {...sliderSettings2}>
                <div className=" pb-3">
                  <div className=" text-xl md:text-2xl lg:text-3xl mb-7  text-center italic text-gray-600	 ">
                    “I love how I can easily create training programs for my
                    athletes and visualize key performance metrics”
                  </div>
                  <div className="  text-2xl  text-center ">
                    <span className=" tracking-wider font-semibold">
                      Arup Nath,
                    </span>{" "}
                    <br />
                    <span className=" text-[15px] md:text-xl">
                      Tennis coach (Bangalore)
                    </span>
                  </div>
                </div>
                <div className=" pb-3">
                  <div className=" text-xl md:text-2xl lg:text-3xl mb-7  text-center italic text-gray-600	 ">
                    “Athlabs has been a game changer for me and my athletes. The
                    best software for coaches.”
                  </div>
                  <div className="  text-2xl  text-center ">
                    <span className=" tracking-wider font-semibold">
                      Alexander West,
                    </span>{" "}
                    <br />
                    <span className=" text-[15px] md:text-xl">
                      BMX cycling coach (Berlin)
                    </span>
                  </div>
                </div>
                <div className=" pb-3">
                  <div className=" text-xl md:text-2xl lg:text-3xl mb-7  text-center italic text-gray-600	 ">
                    “Strength training is very difficult without proper feedback
                    and this is where Athlabs shines!”
                  </div>
                  <div className="  text-2xl  text-center ">
                    <span className=" tracking-wider font-semibold">
                      Dev Borah,
                    </span>{" "}
                    <br />
                    <span className=" text-[15px] md:text-xl">
                      Badminton Player (Bangalore)
                    </span>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </section>
      </div>

    </LandingLayout>
  );
};

export default AppPage;
