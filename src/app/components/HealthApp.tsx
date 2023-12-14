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

          const img = images[i];
          const tl = gsap.timeline();
          tl.to(img, {
            alpha: 1,
            ease: "power3.out",
            duration: 0.5,
          });

          ScrollTrigger.create({
            id: "slide__" + i,
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
        <div className="hp-slides__center  sticky top-12">
          <div className="container mx-auto  px-6 lg:px-8">
            <div className=" flex justify-center gap-x-20">
              <div className=" w-4/12"></div>
              <div className="hp-slides__phones w-3/12 min-h-[600px] h-screen mx-auto relative ">
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
              </div>
              <div className=" w-4/12"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--1 py-14 md:py-14 md:py-20">
        <div className="container mx-auto  px-6 lg:px-8">
          <div className=" flex items-center  flex-col-reverse lg:flex-row justify-between flex-wrap lg:flex-nowrap gap-x-20">
            <div className="hp-slide__info w-full lg:w-4/12 relative z-20">
              <h1 className="hp-slide__title">Instant, corrective, feedback</h1>
              <p className="hp-slide__text">
                Get directed, actionable feedback by our fine-tuned, exercise
                specific multi-modal AI models
              </p>
            </div>
            <div className="hp-slide__phone-stub w-full lg:w-3/12 lg:min-h-[600px] lg:h-screen opacity-100 lg:opacity-0">
              <Image
                src="/images/64d2e0a08848f53dee006f29_basisstack.png"
                loading="lazy"
                alt=""
                className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto  -mt-20 lg:mt-0"
                width={422}
                height={850}
              />
            </div>
            <Image
              src="/images/chatinfo2.png"
              loading="eager"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12"
              width={488}
              height={554}
            />
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--2 py-14 md:py-20">
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
              <Image
                src="/images/64d2e183120f6b29b37e63e6_basishabits.png"
                loading="lazy"
                alt=""
                className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto  -mt-20 lg:mt-0"
                width={422}
                height={850}
              />
            </div>
            <Image
              src="/images/coachnetwork2.png"
              loading="eager"
              sizes="(max-width: 991px) 100vw, 50vw"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12"
              width={488}
              height={554}
            />
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--3 py-14 md:py-20">
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
              <Image
                src="/images/64d2e3acd32aebafaef11531_basiscalendar.png"
                loading="lazy"
                alt=""
                className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto  -mt-20 lg:mt-0"
                width={422}
                height={850}
              />
            </div>
            <Image
              src="/images/calendar1.png"
              loading="eager"
              sizes="(max-width: 991px) 100vw, 50vw"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12"
              width={488}
              height={554}
            />
          </div>
        </div>
      </div>

      <div className="s-hp-slide  relative z-10 is--4 py-14 md:py-20">
        <div className="container mx-auto  px-6 lg:px-8">
          <div className=" flex items-center flex-col-reverse  justify-between lg:flex-row-reverse flex-wrap lg:flex-nowrap gap-x-20">
            <div className="hp-slide__info w-full lg:w-4/12 relative z-20">
              <h1 className="hp-slide__title">
                Elevate your game with expert insights
              </h1>
              <p className="hp-slide__text">
                Receive insights on your game from seasoned sports coaches to
                enhance your performance
              </p>
            </div>
            <div className="hp-slide__phone-stub w-full lg:w-3/12 lg:min-h-[600px] lg:h-screen opacity-100 lg:opacity-0">
              <Image
                src="/images/64ae1282c17c9ae16b938102_automation.png"
                loading="lazy"
                alt=""
                className="my_slider_image  w-7/12 sm:w-7/12 md:w-6/12 lg:w-full mx-auto  -mt-20 lg:mt-0"
                width={422}
                height={850}
              />
            </div>
            <Image
              src="/images/social.png"
              loading="eager"
              sizes="(max-width: 991px) 100vw, 50vw"
              alt=""
              className="hp-slide__img  w-full lg:w-4/12"
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
