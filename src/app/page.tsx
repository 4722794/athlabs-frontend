"use client";
import React, { useEffect, useState } from "react";
import HealthApp from "./components/HealthApp";
import LandingLayout from "./layout/LandingLayout";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import Slider from "react-slick";
import Typewriter from "typewriter-effect";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAmp } from "next/amp";
import { FECallApi } from "./services/apiUtils";
import LoadingComp from "./components/LoadingComp";
import { Spinner } from "flowbite-react";
import ComonToast from "./components/ComonToast";

const AppPage = () => {
  const [sliderItems, setSliderItems] = useState([
    {
      id: 1,
      type: "image",
      src: "/images/mp4/kettlebelldl.mp4",
      text: "Push hips back…",
    },
    {
      id: 2,
      type: "image",
      src: "/images/mp4/boxjumps.mp4",
      text: "Land softly,extend hips at top...",
    },
    {
      id: 3,
      type: "image",
      src: "/images/mp4/deadlift.mp4",
      text: "Back straight, Engage your Glutes…",
    },
  ]);
  const [typewriterShow, SetTypewriterShow] = useState(true);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (id: any) => {
      SetTypewriterShow(true);
    },
    beforeChange: (id: any) => {
      SetTypewriterShow(false);
    },
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
  const [mail, setMail] = useState("");
  const [formErrors, setFormErrors] = useState({ mail: "" });
  const [loading, setLoading] = useState(false);
  const [toastTObj, setToastTObj] = useState({ type: "", msg: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateForm = () => {
    let valid = true;
    const errors = { mail: "" };

    if (!mail) {
      errors.mail = "Required a valid Email";
      valid = false;
    } else if (!emailRegex.test(mail)) {
      errors.mail = "Invalid email format";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (formId: any, e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const uriString = `/mail`;
      const formData = new URLSearchParams();
      formData.append("email", mail);
      formData.append("type", "client");
      const contentType = "application/x-www-form-urlencoded";
      const responseData = await FECallApi(
        "POST",
        contentType,
        formData,
        uriString
      );
      console.log(responseData);
      if (responseData.status === 200) {
        toastTObj.type = "s";
        toastTObj.msg =
          responseData?.data?.message ||
          "Thank you for Requesting Access code, We will get back to you.";
        setToastTObj(toastTObj);
      } else {
        toastTObj.type = "e";
        toastTObj.msg = "Error submitting form"+'---'+JSON.stringify(responseData);
        setToastTObj(toastTObj);
      }
      setLoading(false);
      setMail("");
    }
  };

  /*Footer form (exclusive beta program)*/
  const [betaEmail, setBetaMail] = useState("");
  const [betaFormErrors, setBetaFormErrors] = useState({ betaEmail: "" });
  const [betaFormloading, setBetaFormLoading] = useState(false);
  const [toastBetaObj, setToastBetaObj] = useState({ type: "", msg: "" });

  const validateBetaForm = () => {
    let valid = true;
    const betaErrors = { betaEmail: "" };

    if (!betaEmail) {
      betaErrors.betaEmail = "Required a valid Email";
      valid = false;
    } else if (!emailRegex.test(betaEmail)) {
      betaErrors.betaEmail = "Invalid email format";
      valid = false;
    }
    setBetaFormErrors(betaErrors);
    return valid;
  };

  const handleSubmitBetaForm = async (formId: any, e: any) => {
    e.preventDefault();
    if (validateBetaForm()) {
      setBetaFormLoading(true);
      const uriString = `/mail`;
      const formData = new URLSearchParams();
      formData.append("email", betaEmail);
      formData.append("type", "client");
      const contentType = "application/x-www-form-urlencoded";
      const responseBetaData = await FECallApi(
        "POST",
        contentType,
        formData,
        uriString
      );
      if (responseBetaData.status === 200) {
        toastBetaObj.type = "s";
        toastBetaObj.msg =
          responseBetaData?.data?.message ||
          "Thank you for Joining beta program, We will get back to you.";
        setToastBetaObj(toastBetaObj);
      } else {
        toastBetaObj.type = "e";
        toastBetaObj.msg = "Error submitting form";
        setToastBetaObj(toastBetaObj);
      }
      setBetaFormLoading(false);
      setBetaMail("");
    }
  };

  return (
    <LandingLayout>
      <div className="relative z-20">
        <section className="  xl:sticky top-0  ">
          <div className="py-0 bg-[#04080f]   min-h-[550px] items-center 2xl:pt-5 pb-10 md:pb-0">
            <div className="container mx-auto  px-6 md:px-8 flex flex-wrap lg:flex-nowrap items-center justify-between pt-20 2xl:pt-24  pb-20 h-full gap-y-12">
              <div className=" w-full lg:w-8/12">
                <h2 className=" text-3xl  md:text-5xl  xl:text-6xl  2xl:text-8xl font-bold mb-6 text-[#98a2b3] leading-10 md:leading-[4rem] xl:leading-[5rem] 2xl:leading-[7.5rem] text-center lg:text-left">
                  <div>Precision feedback</div>
                  Peak performance
                </h2>
                <div className=" text-2xl md:text-4xl text-white/80 my-5 md:my-10 text-center md:text-left">
                  Your digital coach for injury-free training.
                </div>

                <div>
                  <div className="w-full lg:w-10/12 pt-5">
                    <form
                      className="flex items-center flex-1 justify-start mt-30 relative"
                      onSubmit={(e) => handleSubmit("injuryFreeTraining", e)}
                    >
                      <div className="w-full relative text-left">
                        <input
                          type="text"
                          placeholder=" > enter your email"
                          value={mail}
                          onChange={(e) => setMail(e.target.value)}
                          className="box-border placeholder:text-white/50 text-white bg-[#1a212f] border-1 border-[#344054] pl-5 md:p-2 md:pl-5 h-12 xl:h-14 2xl:h-[75px]  w-full  outline-2 outline-gray-800 rounded "
                        />
                        {formErrors.mail && (
                          <span>
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.mail}
                            </p>
                          </span>
                        )}

                        {loading && (
                          <div className=" absolute top-1/2  transform -translate-y-1/2  right-[250px]">
                            <Spinner />
                          </div>
                        )}

                        {toastTObj.type && (
                          <div className=" absolute mt-0 top-0">
                            <ComonToast
                              toastObj={toastTObj}
                              setToastObj={setToastTObj}
                            />
                          </div>
                        )}
                      </div>

                      <input
                        type="submit"
                        value="Get access"
                        data-wait="..."
                        className=" px-3 md:px-0 md:w-[200px] cursor-pointer  text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded bg-gradient-to-r from-[#101828] to-[#44366a] h-10 xl:h-12 2xl:h-[60px] absolute right-1 2xl:right-2 top-1 2xl:top-2 overflow-visible"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="   w-[266px] sm:w-[356px] md:w-[326px] lg:w-4/12 2xl:w-4/12  flex justify-center lg:justify-center mx-auto lg:mr-0">
                <div className="relative w-full   lg:w-10/12 xl:w-7/12 2xl:w-8/12 ">
                  {/* <div className=" w-[calc(100%-8px)] h-full absolute bg-white  rounded-[50px] z-0 left-1"></div> */}
                  <Image
                    src="/images/iphone-x-png-29483.png"
                    width={304}
                    height={614}
                    className=" w-full"
                    alt=""
                  />

                  <div className=" absolute z-20 top-3 left-1/2 transform -translate-x-1/2 curso">
                    <Image
                      src="/images/top.png"
                      width={120}
                      height={22}
                      className=" "
                      alt=""
                    />
                  </div>

                  <div
                    className="  absolute  transform top-1/2 -translate-y-1/2 left-1/2  -translate-x-1/2  h-[calc(100%-35px)] w-[calc(100%-35px)] overflow-hidden
                   rounded-[22px] sm:rounded-[30px] md:rounded-[30px]  lg:rounded-[20px]  xl:rounded-[28px] 2xl:rounded-[30px]
                  "
                  >
                    <div className=" relative  h-full w-full overflow-hidden  scale-110">
                      <div className="absolute mySlider transform top-1/2 -translate-y-1/2 left-1/2  -translate-x-1/2  h-[calc(100%+0px)] w-[calc(100%+0px)]   overflow-hidden ">
                        <Slider className="  h-full " {...sliderSettings}>
                          {sliderItems.map((item, index) => (
                            <div key={item.id} className="relative h-full">
                              {item.type === "image" && (
                                <>
                                  <div className="absolute transform top-1/2 -translate-y-1/2 left-1/2  -translate-x-1/2 w-full h-full  ">
                                    {/* <Image
                                  src={item.src}
                                  width={800}
                                  height={1500}
                                  alt=""
                                /> */}

                                    <video
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                      className="  h-full w-full "
                                    >
                                      <source src={item.src} type="video/mp4" />
                                    </video>
                                  </div>

                                  <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 w-[calc(100%-30px)] rounded-b-[0px] px-3 md:px-3 !py-3 h-auto bg-black/50 text-white text-2xl flex">
                                    <div>
                                      {typewriterShow && (
                                        <Typewriter
                                          options={{
                                            strings: item.text,
                                            autoStart: true,
                                            loop: true,
                                            delay: 100,
                                          }}
                                        />
                                      )}
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
                <form
                  className="flex items-center flex-1 justify-start mt-30 relative"
                  onSubmit={(e) => handleSubmitBetaForm("betaProgram", e)}
                >
                  <div className="w-full relative text-left">
                    <input
                      type="text"
                      placeholder=" > enter your email"
                      className="box-border shadow-none text-[#212121] bg-[#dadada] border-1 border-[#344054]   md:p-2 md:pl-5 h-12 xl:h-14 2xl:h-[75px]  w-full  outline-2 outline-gray-800 rounded"
                      onChange={(e) => setBetaMail(e.target.value)}
                      value={betaEmail}
                    />
                    {betaFormErrors.betaEmail && (
                      <span>
                        <p className="text-red-500 text-xs mt-1">
                          {betaFormErrors.betaEmail}
                        </p>
                      </span>
                    )}

                    {betaFormloading && (
                      <div className=" absolute top-1/2  transform -translate-y-1/2  right-[250px]">
                        <Spinner color="purple" />
                      </div>
                    )}
                  </div>

                  {toastBetaObj.type && (
                    <span className=" absolute mt-0 top-0">
                      <ComonToast
                        toastObj={toastBetaObj}
                        setToastObj={setToastBetaObj}
                      />
                    </span>
                  )}
                  <input
                    type="submit"
                    value="Get access"
                    data-wait="..."
                    className="px-3 md:px-0 md:w-[200px] cursor-pointer text-white text-center tracking-wider capitalize whitespace-normal object-fill rounded-sm bg-gradient-to-r from-[#101828] to-[#44366a]  h-10 xl:h-12 2xl:min-h-[60px] absolute right-1 xl:right-1 2xl:right-2 top-1 xl:top-1 2xl:top-2 overflow-visible rounded"
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
