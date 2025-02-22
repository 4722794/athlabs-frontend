"use client";
import React, { useEffect } from "react";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HealthApp = () => {
  useEffect(() => {
    const isDesktop = window.innerWidth >= 992;
    // const S = document.querySelector(".s-hp-slides");
    const slides = document.querySelectorAll(".s-hp-slide");
    const images = document.querySelectorAll(".my_slider_image");
    const newimages = document.querySelectorAll(".setIndex_");

    const COLORS = [
      { bg: "#0f1828", text: "#ffffff" },
      { bg: "#d0d5dd", text: "#04080F" },
      { bg: "#667085", text: "#04080F" },
      { bg: "#0f1828", text: "#ffffff" },
      { bg: "#e3e7ec", text: "#04080F" },
    ];

    if (document.readyState === "complete") init();
    else window.addEventListener("load", init);

    function init() {
      initSlides();
    }

    function initSlides() {
      if (isDesktop) {
        slides.forEach((el, i) => {
          if (i === 0) return;

          // const img = images[i];
          const img = newimages[i];
          const tl = gsap.timeline();
          tl.to(img, {
            alpha: 1,
            ease: "power3.out",
            duration: 0.5,
          });

          ScrollTrigger.create({
            id: "slide__" + i,
            class: "setIndex_" + i,
            trigger: el,
            animation: tl,
            start: "top 50%",
            end: "bottom 100%",
            toggleActions: "restart none none reverse",
          });
        });
      }

      slides.forEach((el, i) => {
        ScrollTrigger.create({
          id: "color__" + i,
          trigger: el,
          start: isDesktop ? "top 70%" : "top 20%",
          end: "bottom 100%",
          onEnter: () => {
            setColor(i);
          },
          onLeaveBack: () => {
            setColor(i - 1);
          },
        });
      });
    }

    function setColor(i: number): void {
      if (i < 0) return;

      slides.forEach((slide) => {
        if (slide instanceof HTMLElement) {
          slide.style.background = COLORS[i].bg;
          slide.style.color = COLORS[i].text;
        }
      });
    }
  }, []);

  return (
    <>
      <div className="hp-slides__sticky-wrap z-20 pointer-events-none  absolute w-full h-full hidden lg:block">
        <div className="hp-slides__center  sticky top-12  pt-10 ">
          <div className="container mx-auto  px-6 lg:px-8 lg:min-h-screen flex  justify-center">
            <div className=" flex justify-center gap-x-20 w-full  ">
              <div className=" w-4/12"></div>
              <div className=" w-3/12   h-[calc(100%-120px)] xl:h-[calc(100%-120px)] mx-auto flex items-center justify-center ">
                <div className="relative  w-full h-[436px] xl:h-[536px] flex justify-center setCustomMedia">
                  <div className="  w-full h-auto z-10">
                    <Image
                      src="/images/newIphon.png"
                      loading="lazy"
                      alt=""
                      className=" w-auto h-full mx-auto "
                      width={422}
                      height={850}
                    />
                  </div>

                  <div className=" absolute overflow-hidden rounded-[40px] xl:rounded-[60px]  top-1/2 transform -translate-y-1/2 h-full md:h-full  left-1/2  -translate-x-1/2  w-full px-0 py-0 xl:px-0 xl:py-0">
                    <div className=" relative  w-auto h-full scale-95 xl:scale-95 image_box">
                      <Image
                        src="/images/1_.png"
                        loading="lazy"
                        alt=""
                        className=" absolute w-auto h-full left-1/2 transform -translate-x-1/2 setIndex_  opacity-100 xl:rounded-2xl"
                        width={422}
                        height={850}
                      />
                      <Image
                        src="/images/2_.png"
                        loading="lazy"
                        alt=""
                        className=" absolute w-auto h-full left-1/2 transform -translate-x-1/2 setIndex_  opacity-0 xl:rounded-2xl"
                        width={422}
                        height={850}
                      />
                      <Image
                        src="/images/mp4/new/newsection3.png"
                        loading="lazy"
                        alt=""
                        className=" absolute w-auto h-full left-1/2 transform -translate-x-1/2 setIndex_  opacity-0 xl:rounded-2xl"
                        width={422}
                        height={850}
                      />

                      <div className=" absolute w-full h-full left-1/2 transform -translate-x-1/2 setIndex_  opacity-0 px-1">
                        <div className=" h-full  setCustomINdex  ">
                          {/* <Image
                            src="/images/64d2e3acd32aebafaef11531_basiscalendar.png"
                            loading="lazy"
                            alt=""
                            className=" absolute w-auto h-full left-1/2 transform -translate-x-1/2 setIndex_  opacity-0"
                            width={422}
                            height={850}
                          /> */}

                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="  w-full h-full   "
                          >
                            <source
                              src={"/images/mp4/golfswingfull.mp4"}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                      {/* <Image
                        src="/images/web/golfswing.webm"
                        loading="lazy"
                        alt=""
                        className=" absolute w-auto h-full left-1/2 transform -translate-x-1/2 setIndex_  opacity-0"
                        width={422}
                        height={850}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="hp-slides__phones w-3/12 min-h-[600px] h-screen mx-auto relative ">
                <Image
                  src="/images/64d2e0a08848f53dee006f29_basisstack.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full first:relative first:opacity-100"
                  width={422}
                  height={850}
                />
                <Image
                  src="/images/64d2e183120f6b29b37e63e6_basishabits.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image"
                  width={422}
                  height={850}
                />
                <Image
                  src="/images/64d2e3acd32aebafaef11531_basiscalendar.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image"
                  width={422}
                  height={850}
                />
                <Image
                  src="/images/64ae1282c17c9ae16b938102_automation.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image"
                  width={422}
                  height={850}
                />
              </div> */}
              <div className=" w-4/12"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--1 py-16 md:py-14 md:py-20">
        <div className="container mx-auto  px-6 lg:px-8">
          <div className=" flex items-center  flex-col-reverse lg:flex-row justify-between flex-wrap lg:flex-nowrap gap-x-20">
            <div className="hp-slide__info w-full lg:w-4/12 relative z-20">
              <h1 className="hp-slide__title">Instant, corrective, feedback</h1>
              <p className="hp-slide__text">
                Get directed, actionable feedback by our fine-tuned, exercise
                specific multi-modal AI models
              </p>
            </div>
            <div className="hp-slide__phone-stub w-full lg:w-3/12 lg:min-h-[600px] lg:h-screen opacity-100 lg:opacity-0 order-2 lg:order-1">
              <div className=" relative ">
                <Image
                  src="/images/1_.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  absolute w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto lg:mt-0 rounded-2xl scale-[1.009]"
                  width={422}
                  height={850}
                />

                <Image
                  src="/images/newIphon.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto relative z-10  scale-105 "
                  width={422}
                  height={850}
                />
              </div>
            </div>

            <div className="hp-slide__img  w-full lg:w-4/12 order-1 lg:order-2 mt-10 lg:mt-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="  w-full h-auto"
              >
                <source
                  src={"/images/mp4/new/chatvideo.mp4"}
                  type="video/mp4"
                />
              </video>
            </div>

            {/* <Image
              src="/images/chatinfo2.png"
              loading="eager"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12 order-1 lg:order-2 mt-10 lg:mt-0"
              width={488}
              height={554}
            /> */}
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--2 py-16 md:py-20">
        <div className="container mx-auto  px-6 lg:px-8">
          <div className=" flex items-center flex-col-reverse  justify-between lg:flex-row-reverse flex-wrap lg:flex-nowrap gap-x-20">
            <div className="hp-slide__info w-full lg:w-4/12 relative z-20">
              <h1 className="hp-slide__title">
                Personalized guidance from a sports specialist
              </h1>
              <p className="hp-slide__text">
                Consult a leading expert from our large network of coaches to
                get precise guidance on your form
              </p>
            </div>
            <div className="hp-slide__phone-stub w-full lg:w-3/12 lg:min-h-[600px] lg:h-screen opacity-100 lg:opacity-0">
              <div className=" relative">
                <Image
                  src="/images/2_.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  absolute w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto lg:mt-0 rounded-2xl scale-[1.009]"
                  width={422}
                  height={850}
                />

                <Image
                  src="/images/newIphon.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto relative z-10 scale-105 "
                  width={422}
                  height={850}
                />
              </div>
            </div>
            <Image
              src="/images/coachnetwork2.png"
              loading="eager"
              sizes="(max-width: 991px) 100vw, 50vw"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12  mb-10 lg:mb-0"
              width={488}
              height={554}
            />
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--3 py-16 md:py-20">
        <div className="container mx-auto  px-6 lg:px-8">
          <div className=" flex items-center flex-col-reverse lg:flex-row justify-between flex-wrap lg:flex-nowrap gap-x-20">
            <div className="hp-slide__info w-full lg:w-4/12 relative z-20">
              <h1 className="hp-slide__title">
                Tailored plans for your next challenge
              </h1>
              <p className="hp-slide__text">
                Partner with our expert coaches who will prepare training
                programs customized to your specific goal whether it’s a tennis
                tournament, a marathon or climbing mountains
              </p>
            </div>
            <div className="hp-slide__phone-stub w-full lg:w-3/12 lg:min-h-[600px] lg:h-screen opacity-100 lg:opacity-0">
              <div className=" relative">
                <Image
                  src="/images/mp4/new/newsection3.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  absolute w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto lg:mt-0 rounded-2xl  scale-[1.009]"
                  width={422}
                  height={850}
                />
                <Image
                  src="/images/newIphon.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto relative z-10  scale-105 "
                  width={422}
                  height={850}
                />
              </div>
            </div>
            <Image
              src="/images/calendar1.png"
              loading="eager"
              sizes="(max-width: 991px) 100vw, 50vw"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12  mb-10 lg:mb-0"
              width={488}
              height={554}
            />
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--4 py-16 md:py-20">
        <div className="container mx-auto  px-6 lg:px-8">
          <div className=" flex items-center flex-col-reverse  justify-between lg:flex-row-reverse flex-wrap lg:flex-nowrap gap-x-20">
            <div className="hp-slide__info w-full lg:w-4/12 relative z-20">
              <h1 className="hp-slide__title">
                Elevate your game with expert insights
                <div className=" pt-3 text-[#E63946] text-lg 2xl:text-xl ">
                  (coming soon)
                </div>
              </h1>
              <p className="hp-slide__text">
                Receive insights on your game from seasoned sports coaches to
                enhance your performance
              </p>
            </div>
            <div className="hp-slide__phone-stub w-full lg:w-3/12 lg:min-h-[600px] lg:h-screen opacity-100 lg:opacity-0">
              <div className=" relative">
                {/* <Image
                  src="/images/website_final/gif_new/cropped_golf.gif"
                  loading="lazy"
                  alt=""
                  className="my_slider_image absolute w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto  px-1 my-1.5 rounded-3xl"
                  width={422}
                  height={850}
                /> */}

                <div className="my_slider_image absolute w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto overflow-hidden rounded-2xl ">
                  <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="  w-full h-full"
                  >
                    <source
                      src={"/images/mp4/golfswingfull.mp4"}
                      type="video/mp4"
                    />
                  </video>
                </div>

                <Image
                  src="/images/newIphon.png"
                  loading="lazy"
                  alt=""
                  className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto relative z-10  scale-105"
                  width={422}
                  height={850}
                />
              </div>
            </div>
            <Image
              src="/images/social.png"
              loading="eager"
              sizes="(max-width: 991px) 100vw, 50vw"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12  mb-10 lg:mb-0"
              width={488}
              height={554}
            />
          </div>
        </div>
      </div>

      {/* Add more slides and content as needed */}
    </>
  );
};

export default HealthApp;
