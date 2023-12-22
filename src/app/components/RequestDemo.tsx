"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { FECallApi } from "../services/apiUtils";
import LoadingComp from "./LoadingComp";
import ComonToast from "./ComonToast";

interface SignUpProps {
  popupAction: boolean;
  onCloseModal: () => void;
}

const RequestDemo: React.FC<SignUpProps> = ({ popupAction, onCloseModal }) => {
  const [mail, setMail] = useState("");
  const [formErrors, setFormErrors] = useState({ mail: "" });
  const [loading, setLoading] = useState(false);
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });

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
      formData.append("type", "coach");
      const contentType = "application/x-www-form-urlencoded";
      const responseData = await FECallApi(
        "POST",
        contentType,
        formData,
        uriString
      );

      if (responseData.status === 200) {
        toastObj.type = "s";
        toastObj.msg =
          responseData?.data?.message ||
          "Thank you for Sign up, We will get back to you.";
        setToastObj(toastObj);
      } else {
        toastObj.type = "e";
        toastObj.msg = "Error submitting form";
        setToastObj(toastObj);
      }
      setLoading(false);
      setMail("");
    }
  };

  return (
    <Modal
      className=" z-50 setCostomeModal"
      show={popupAction}
      size="5xl"
      onClose={onCloseModal}
      popup
    >
      <Modal.Header className=" z-10 header_ !text-white" />
      <Modal.Body className=" body_">
        <form onSubmit={(e) => handleSubmit("demoForm", e)}>
          <div className="space-y-6 flex flex-col justify-center relative z-20">
            <h3 className="text-4xl font-bold text-white text-center py-7">
              Get Early Access
            </h3>

            <p className=" text-center text-2xl  text-white">
              Elevate your training today. <br />
              Enter your email below to join our exclusive beta access
            </p>

            <div className=" w-full md:w-10/12 flex lg:w-9/12 gap-x-5 mx-auto pt-12 pb-16 ">
              <div className=" w-full">
                <div className=" relative">
                  <div className=" relative">
                    <input
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 box-border placeholder:text-white/50 text-white bg-[#1a212f] border-1 border-[#344054] sm:text-md rounded
                      pr-[130px] lg:pr-[230px]
                      px-4 py-3
                      lg:p-4 

                      "
                      id="email"
                      placeholder="> enter your email"
                      value={mail}
                      onChange={(event) => setMail(event.target.value)}
                    />

                    <div className="inline-flex absolute top-1/2 transform -translate-y-1/2 right-1">
                      {/* <Button color="dark">Submit</Button>  */}
                      <button
                        type="submit"
                        data-wait="..."
                        className=" z-30 cursor-pointer group flex items-center justify-center p-0.5 px-3 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gray-800 border-0 border-transparent enabled:hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 rounded focus:ring-0
                      bg-gradient-to-r from-[#101828] to-[#44366a]
                      h-11 w-[120px] lg:w-[200px]  2xl:w-[200px] lg:h-[50px] 2xl:h-[50px]
                      "
                        color="dark"
                      >
                        {loading && <Spinner color="purple" />}
                        Get access
                      </button>
                    </div>
                  </div>
                </div>

                {formErrors.mail && (
                  <span>
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.mail}
                    </p>
                  </span>
                )}
                {/* 
                {loading && (
                  <div className=" absolute top-1/2  transform -translate-y-1/2 right-[130px]  lg:right-[250px]">
                    <Spinner color="purple" />
                  </div>
                )} */}

                {toastObj.type && (
                  <span className="mt-5">
                    <ComonToast toastObj={toastObj} setToastObj={setToastObj} />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* <svg
            className="absolute inset-0 w-full h-full z-0"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1463 360"
            data-v-77b1cd82=""
          >
            <path
              className=" text-gray-500/5"
              fill="currentColor"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              data-v-77b1cd82=""
            ></path>
            <path
              className="text-gray-500/10"
              fill="currentColor"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              data-v-77b1cd82=""
            ></path>
          </svg> */}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestDemo;
