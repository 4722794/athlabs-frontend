"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FECallApi } from "../services/apiUtils";
import LoadingComp from "./LoadingComp";
import ComonToast from "./ComonToast";

interface SignUpProps {
  popupAction: boolean;
  onCloseModal: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ popupAction, onCloseModal }) => {
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
      const uriString = `/email`;
      const formData = new URLSearchParams();
      formData.append("email", mail);
      const contentType = "application/x-www-form-urlencoded";
      const responseData = await FECallApi(
        "POST",
        contentType,
        formData,
        uriString
      );
      console.log(responseData);
      if (responseData.status === 200) {
        toastObj.type = "s";
        toastObj.msg = "Thank you for Sign up, We will get back to you.";
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
      className=" z-50"
      show={popupAction}
      size="5xl"
      onClose={onCloseModal}
      popup
    >
      <Modal.Header className=" z-10" />
      <Modal.Body>
        <form onSubmit={(e) => handleSubmit("demoForm", e)}>
          <div className="space-y-6 flex flex-col justify-center relative z-20">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white text-center py-7">
              Sign up for our beta software today.
            </h3>

            <div className=" w-full md:w-10/12 flex lg:w-6/12 gap-x-5 mx-auto pt-12 pb-16 ">
              <div className=" w-full">
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={mail}
                  onChange={(event) => setMail(event.target.value)}
                />
                {formErrors.mail && (
                  <span>
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.mail}
                    </p>
                  </span>
                )}

                {loading && (
                  <div className="mt-3">
                    <LoadingComp />
                  </div>
                )}

                {toastObj.type && (
                  <span className="mt-5"><ComonToast toastObj={toastObj} setToastObj={setToastObj} /></span>
                )}
              </div>

              <div className="inline-flex">
                {/* <Button color="dark">Submit</Button>  */}
                <input
                  type="submit"
                  value="Submit"
                  data-wait="..."
                  className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 rounded-lg focus:ring-2"
                  color="dark"
                />
              </div>
            </div>
          </div>

          <svg
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
          </svg>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
